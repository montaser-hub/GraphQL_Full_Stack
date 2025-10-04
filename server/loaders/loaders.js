import DataLoader from "dataloader";
import { Company, User } from "../database/models.js";

import mongoose from "mongoose";




export const companyLoader =  new DataLoader(async (data)=>{

    const companyIds = data.map(item => item.id);
    

    const filtersCompaniesIds = companyIds.filter(companyId => mongoose.Types.ObjectId.isValid(companyId) );
    
    const companies = await Company.find({ _id: { $in: filtersCompaniesIds } }).select(data[0].selectionsField);
    console.log('companies' , companies);
    

    return companyIds.map(companyId => companies.find(company => company._id.toString() === companyId.toString()));
})


export const usersByCompanyLoader =  new DataLoader(async (companyIds)=>{
    const users = await User.find({ companyId: { $in: companyIds } });
    return companyIds.map(companyId => users.filter(user => user.companyId.toString() === companyId.toString()));
})
