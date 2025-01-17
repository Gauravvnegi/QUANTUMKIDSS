import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createObjectCsvStringifier } from 'csv-writer';

import { CreateFormDto } from './dto/create-form.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateFormStatusDto } from './dto/update-status.dto';
import { Form } from './schema/form.schema';
import StudentForm from './schema/inqueryschema';
import { EnqueryFormDto } from './dto/inquery-form.dto';
import FeeManagement from './schema/feeManagement';
import { FeeSubmissionDto } from './dto/fee-submit.dto';
import { FeeReceiptDto } from './dto/Fee.receipt.dto';
import { FeeReceiptSchema } from './schema/Fee.receipt.schema';
import { FeeReceiptUpdateDto } from './dto/fee.receipt.update.dto';

export interface SubmissionsResult {
  data: Form[];
  totalCount: number;
}
export interface InqueryResult {
  data: StudentForm[];
  totalCount: number;
}

export interface FeeSubmit {
  data: FeeManagement[];
  totalCount: number;
}
@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
    @InjectRepository(StudentForm)
    private studentFormRepository: Repository<StudentForm>,
    @InjectRepository(FeeManagement)
    private feeRepository: Repository<FeeManagement>,
    @InjectRepository(FeeReceiptSchema)
    private feeReceiptRepository: Repository<FeeReceiptSchema>,
  ) {
    console.log("Your form name : ", Form.name);
  }
  async generateApplicantId(candidateName: string): Promise<string> {
    const year = new Date().getFullYear().toString().slice(-2);
    const lastApplicant = await this.studentFormRepository.findOne({
      order: { applicantId: 'DESC' },
      where: {},
    });
  
    let applicantNumber = 1;
    if (lastApplicant) {
      const match = lastApplicant.applicantId.match(/^QK-(\d+)-\d{2}-[A-Z]{3}$/);
      if (match) {
        applicantNumber = parseInt(match[1], 10) + 1;
      } else {
        throw new Error(`Invalid applicantId format: ${lastApplicant.applicantId}`);
      }
    }
    const applicantNumberString = applicantNumber.toString().padStart(4, '0');
    const namePart = candidateName.substring(0, 3).toUpperCase();
    return `QK-${applicantNumberString}-${year}-${namePart}`;
  }
  private async generateCustomId(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let customId = '';
    let isUnique = false;
  
    while (!isUnique) {

      let result = 'QK-';
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      customId = result;
  
      // Check database for existing customId
      const existingForm = await this.formRepository.findOne({
        where: { customId },
      });
  

      if (!existingForm) {
        isUnique = true;
      }
    }
  
    return customId;
  }
  // private generateCustomId(): string {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //   let result = 'QK-';
  //   for (let i = 0; i < 6; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * characters.length));
  //   }
  //   return result;
  // }
  
  async saveForm(createFormDto: CreateFormDto): Promise<Form> {
    try {
      const newForm = this.formRepository.create({
        ...createFormDto,
        uuid: uuidv4(),
        customId: await this.generateCustomId(),
      });
      return this.formRepository.save(newForm);
    } catch (error) {
      throw new Error(`Failed to save form: ${error.message}`);
    }
  }

  async getSubmissions(): Promise<SubmissionsResult> {
    // const skip = (parseInt(offset) - 1) * parseInt(pageSize);
    const [data, totalCount] = await this.formRepository.findAndCount();
    return {
      data,
      totalCount,
    };
  }

  async updateStatus(updateFormStatusDto: UpdateFormStatusDto): Promise<Form> {
    const { uuid, status } = updateFormStatusDto;
    const form = await this.formRepository.findOneBy({ uuid });
    if (!form) {
      throw new BadRequestException('Form not found');
    }
    form.status = status;
    return this.formRepository.save(form);
  }

  async getSubmissionsByStatus(status: string, offset: string, pageSize: string): Promise<SubmissionsResult> {
    const skip = (parseInt(offset) - 1) * parseInt(pageSize);
    const [data, totalCount] = await this.formRepository.findAndCount({
      where: { status },
      skip,
      take: parseInt(pageSize),
    });
    return {
      data,
      totalCount,
    };
  }

  async getCount(status: string): Promise<number> {
    return this.formRepository.count({ where: { status } });
  }
  async saveInqueryForm(enqueryFormDto: EnqueryFormDto): Promise<StudentForm> {
    try {
      const applicantId = await this.generateApplicantId(enqueryFormDto.childName);
      const newForm = this.studentFormRepository.create({
        ...enqueryFormDto,
        uuid: uuidv4(),
        applicantId,
      });

      return await this.studentFormRepository.save(newForm);
    } catch (error) {
      throw new Error(`Failed to save form: ${error.message}`);
    }
  }

  async getInqueryForm(): Promise<InqueryResult> {
    // const skip = (parseInt(offset) - 1) * parseInt(pageSize);
    // const [data, totalCount] = await this.studentFormRepository.findAndCount();
    // return {
    //   data,
    //   totalCount,
    // };
    const [data, totalCount] = await this.studentFormRepository.findAndCount({
      order: { submittedAt: 'DESC' }, 
    });
    return {
      data,
      totalCount,
    };
  }

  async getInqueryFormBycustomId(customId:string): Promise<boolean> {
   
    const [,count] = await this.studentFormRepository.findAndCount({
      where: { customId },
    });
    return count>0;
  }

  async saveFee(feeData: FeeSubmissionDto): Promise<FeeManagement> {
    try {
      const newFee = this.feeRepository.create({
        ...feeData,
        uuid: uuidv4(),
      });
      const savedFee = await this.feeRepository.save(newFee);
      return savedFee;
    } catch (error) {
      throw new Error(`Failed to save fee: ${error.message}`);
    }
  }

  async getFeeDetails(): Promise<FeeSubmit> {
    const [data, totalCount] = await this.feeRepository.findAndCount();
    return {
      data,
      totalCount,
    };
  }

  async updateFeeData(uuid: string, feeSubmissionDto: FeeSubmissionDto): Promise<FeeManagement> {
    const fee = await this.feeRepository.findOne({ where: { uuid } });
    
    if (!fee) {
      throw new BadRequestException('Fee not found');
    }
    Object.assign(fee, feeSubmissionDto);
    return this.feeRepository.save(fee);
  }
  async getFeeDetailsCsv(): Promise<string> {
    const feeDetails = await this.getFeeDetails();

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'customId', title: 'Custom ID' },
        { id: 'firstName', title: 'First Name' },
        { id: 'lastName', title: 'Last Name' },
        { id: 'email', title: 'Email' },
        { id: 'mobileNumber', title: 'Mobile Number' },
        { id: 'firstInstallment', title: 'First Installment' },
        { id: 'secondInstallment', title: 'Second Installment' },
        { id: 'thirdInstallment', title: 'Third Installment' },
        {id:'firstInstallmentStatus',title:'First Installment Status'},
        {id:'secondInstallmentStatus',title:'Second Installment Status'},
        {id:'thirdInstallmentStatus',title:'Third Installment Status'},
        
      ],
    });
    const csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(feeDetails.data);
    return csvData;
  }

  async getLeadDetailsCsv(): Promise<string> {
    const leadDetails = await this.getSubmissions();

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'customId', title: 'Custom ID' },
        { id: 'firstName', title: 'First Name' },
        { id: 'lastName', title: 'Last Name' },
        { id: 'email', title: 'Email' },
        { id: 'address', title: 'Address' },
        { id: 'mobileNumber', title: 'Mobile Number' },
        { id: 'category', title: 'Category' },
        { id: 'submittedAt', title: 'submitted At' },
        { id: 'status', title: 'Status' },
      ],
    });
    const csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(leadDetails.data);
    return csvData;
  }
  async getDataByClassName(classs: string): Promise<StudentForm[]> {
    const resp = await this.studentFormRepository.find({ where: { program: classs } });
    if(resp){
      return resp;
    }
    return null;
  }
  async createReceiptForClass(feeReceipt: FeeReceiptDto): Promise<FeeReceiptSchema> {
    try {
      const newFeeReceipt = this.feeReceiptRepository.create({
        ...feeReceipt,
        uuid: uuidv4(),
      });
      
      const savedFeeReceipt = await this.feeReceiptRepository.save(newFeeReceipt);

      return savedFeeReceipt;  
    } catch (error) {
      throw new Error(`Failed to save fee receipt: ${error.message}`);
    }
  }
  

  async checkStudentFeePresent(customId: string): Promise<boolean> {
      const res = await this.feeReceiptRepository.find({
        where: { customId: customId }
      });
      return res.length > 0;
  }

  async getAllFeeReceipt(){
    const res = await this.feeReceiptRepository.find();
    if(res){
      return res;
    }
    return null;
  }
  async updateReceiptForClass(updateFeeRec: FeeReceiptUpdateDto): Promise<FeeReceiptSchema> {
    const feeReceipt = await this.feeReceiptRepository.findOne({ where: { customId: updateFeeRec.customId } });
    if (!feeReceipt) {
      throw new BadRequestException('Fee receipt not found');
    }
    Object.assign(feeReceipt, updateFeeRec);
    return this.feeReceiptRepository.save(feeReceipt);
  }

  async getByClassName(className:string):Promise<FeeReceiptSchema>{
    const findData = await this.feeReceiptRepository.findOne({where:{program:className}});
    if(findData){
      return findData;
    }
    return null;

  }
}