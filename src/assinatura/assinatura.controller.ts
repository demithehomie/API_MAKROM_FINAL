import axios from 'axios';
import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

require('dotenv').config();

//const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_API_KEY = "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNTA4OTE6OiRhYWNoXzg2MDQ2MzlmLTI4ZDQtNGZiMi04YjI5LWM1NWMyNzBjOGMyNw==";

@Controller('subscriptions')
export class AssinaturaController {

  private readonly asaasApiUrl = 'https://sandbox.asaas.com/api/v3';

  constructor(private httpService: HttpService) {}

    @Post()
    async createSubscription(@Body() datacliente: any): Promise<any> {
      const url = `${this.asaasApiUrl}/subscriptions`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      const response = await axios.post(url, datacliente, { headers });
      return response.data;
    }
    
    @Get()
    async getSubscriptions() {
      const url = `${this.asaasApiUrl}/subscriptions`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      const response = await axios.get(url, {headers});
      return response.data;
    }
    
    @Get(':id')
    async getSubscription(@Param('id') id: string): Promise<any> {
      const url = `${this.asaasApiUrl}/subscriptions`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      const response = await axios.get(url + `/${id}`, {headers});
      return response.data;
    }
    
    @Get(':id')
    async getSubscriptionPays(@Param('id') id: string): Promise<any> {
      const url = `${this.asaasApiUrl}/subscriptions/${id}/payments`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      const response = await axios.get(url, {headers});
      return response.data;
    }

    @Delete(':id')
    async deleteSubscription(@Param('id') id: string): Promise<any> {
      const url = `${this.asaasApiUrl}/subscriptions`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      const response = await axios.delete(url + `/${id}`, {headers});
      return response.data;
    }

    @Post(':id')
    async updateSubscription(@Param('id') id: string, @Body() datacliente: any): Promise<any> {
      const url = `${this.asaasApiUrl}/subscriptions`;
      const headers = {  access_token: ASAAS_API_KEY, 'Content-Type': 'application/json' };
      const response = await axios.post(url + `/${id}`, datacliente, {headers});
      return response.data;
    }
}