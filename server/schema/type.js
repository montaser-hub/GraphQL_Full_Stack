import { GraphQLObjectType, GraphQLString , GraphQLID , GraphQLInt , GraphQLList } from "graphql";
import { fieldsList } from "graphql-fields-list";



export  const  UserType = new GraphQLObjectType({
    name:"UserType",
    fields:()=>({
        id:{type : GraphQLID},
        firstName:{type : GraphQLString},
        age:{type : GraphQLInt},
        company:{
            type : companyType,
            async resolve(parent , args , context , info ){

                const fields = fieldsList(info);

                const selectionsField = {};
                for (let index = 0; index < fields.length; index++) {


                    if (fields[index] === 'company') {
                        selectionsField['companyId'] = 1;
                        continue;
                    }
                    selectionsField[fields[index]] = 1;
                }  


                if (!parent.companyId) {
                    return;
                }
                return await context.companyLoader.load({id:parent.companyId , selectionsField});
            }
        },
    })
});

export const companyType = new GraphQLObjectType({
    name:"CompanyType",
    fields:()=>({
        id:{type : GraphQLID},
        name:{type : GraphQLString},
        slogan:{type : GraphQLString},
        users: {
            type: new GraphQLList(UserType),
            async resolve(parent , args , context ){
                return await context.usersByCompanyLoader.load(parent._id);
            }
        },
    })
});




