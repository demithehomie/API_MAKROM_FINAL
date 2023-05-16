import axios from 'axios'
import { Controller, Post, Body, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClienteDTO } from './client.dto';
import { ClienteService } from './client.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParamId } from 'src/decorators/param-id.decorator';
//import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

require('dotenv').config();

// const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_API_KEY = "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNTA4OTE6OiRhYWNoXzg2MDQ2MzlmLTI4ZDQtNGZiMi04YjI5LWM1NWMyNzBjOGMyNw==";

@Controller('customers')
export class ClienteController {

  private readonly asaasApiUrl = 'https://sandbox.asaas.com/api/v3';
 
  constructor( private httpService: HttpService, private clienteService: ClienteService, private prisma: PrismaService) {}

   
    // @UseGuards(JwtAuthGuard)                               
    @Post()
    async createCustomers(@Body() datacliente: any): Promise<any> {
      const url = `${this.asaasApiUrl}/customers`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      // ABAIXO SALVA NO BANCO DE DADOS DO ASAAS
      const response = await axios.post(url, datacliente, { headers });
       // ACIMA SALVA NO BANCO DE DADOS DO ASAAS  
      const new_id = response.data.id;
      const new_name = response.data.name;
      const new_cpfCnpj = response.data.cpfCnpj;

      // ABAIXO SALVA NO BANCO DE DADOS
      const saved_data = await this.clienteService.create(new_id, new_name, new_cpfCnpj);
      // ACIMA SALVA NO BANCO DE DADOS
      return { ...response.data, saved_data };
        //
    }
  

  @Get('/customers_from_database/:cpfCnpj')
  async getCustomersFromDatabaseByCPF(@Param('cpfCnpj') cpfCnpj: string) {
    console.log({cpfCnpj});
    return this.clienteService.showByCPF(cpfCnpj);
  }

  @Get('/customers_from_database_by_id/:id')
  async getCustomersFromDatabaseByCustomerID(@Param('id') id: string) {
    console.log({id});
    return this.clienteService.showById(id);
  }

 //
  @Get('/customers_from_database')
  async getAllCustomersFromDatabase() {
    //console.log({cpfCnpj});
    return this.clienteService.list();
  }

 


    @Get()
    async getCustomers() {
      const url = `${this.asaasApiUrl}/customers`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      const response = await axios.get(url, {headers});
      return response.data;
    }
    
    @Get(':id')
    async getCustomer(@Param('id') id: string): Promise<any> {
      const url = `${this.asaasApiUrl}/customers`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      const response = await axios.get(url + `/${id}`, {headers});
      return response.data;
    }

    @Delete(':id')
    async deleteCustomer(@Param('id') id: string): Promise<any> {
      const url = `${this.asaasApiUrl}/customers`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      const response = await axios.delete(url + `/${id}`, {headers});
      return response.data;
    }

    @Post(':id')
    async updateCustomer(@Param('id') id: string, @Body() datacliente: any): Promise<any> {
      const url = `${this.asaasApiUrl}/customers`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      const response = await axios.post(url + `/${id}`, datacliente, {headers});
      return response.data;
    }
}
