import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLError,
} from "graphql";
import { User, Company } from "../database/models.js";
import { UserType, companyType } from "./type.js";
import { fieldsList } from "graphql-fields-list";

const query = new GraphQLObjectType({
  name: "myUsers",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args, context, info) {
        const fields = fieldsList(info);
        const selectionsField = {};
        for (let index = 0; index < fields.length; index++) {
          if (fields[index] === "company") {
            selectionsField["companyId"] = 1;
            continue;
          }
          selectionsField[fields[index]] = 1;
        }

        const users = await User.find().select(selectionsField);

        return users;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const user = await User.findById(args.id);
        return user;
      },
    },
    companies: {
      type: new GraphQLList(companyType),
      async resolve(parent, args) {
        const companies = await Company.find();
        return companies;
      },
    },
    company: {
      type: companyType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const company = await Company.findById(args.id);
        return company;
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "myMutations",
  fields: () => ({
    createUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const { firstName, age, companyId } = args;

        if (companyId) {
          const company = await Company.findById(companyId);
          if (!company) throw new GraphQLError("Company not found");
        }
        const user = await User.create({ firstName, age, companyId });
        return user;
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const user = await User.findById(args.id);
        if (!user) throw new GraphQLError("User not found");
        if (args.companyId) {
          const company = await Company.findById(args.companyId);
          if (!company) throw new GraphQLError("Company not found");
        }
        return await User.findByIdAndUpdate(args.id, args, { new: true });
      },
    },
    deleteUser: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        const user = await User.findByIdAndDelete(args.id);
        if (!user) throw new GraphQLError("User not found");
        return "User deleted";
      },
    },

    // --- COMPANY MUTATIONS ---
    createCompany: {
      type: companyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        slogan: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        return await Company.create(args);
      },
    },
    updateCompany: {
      type: companyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        slogan: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const company = await Company.findByIdAndUpdate(
          args.id,
          { name: args.name, slogan: args.slogan },
          { new: true }
        );
        if (!company) throw new GraphQLError("Company not found");
        return company;
      },
    },
    deleteCompany: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        const company = await Company.findByIdAndDelete(args.id);
        if (!company) throw new GraphQLError("Company not found");
        return "Company deleted";
      },
    },
  }),
});

export const schema = new GraphQLSchema({
  query,
  mutation,
});
