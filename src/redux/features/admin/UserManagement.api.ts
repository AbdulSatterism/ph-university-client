import { TResponseRedux } from "../../../types/global.types";
import { TStudent } from "../../../types/userMnamagement/userManagement.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
    getAllAdmin: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaculty: builder.query({
      query: () => ({
        url: "/faculties",
        method: "GET",
      }),
    }),
    getAllStudent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddStudentMutation,
  useAddAdminMutation,
  useGetAllStudentQuery,
  useAddFacultyMutation,
  useGetAllFacultyQuery,
  useChangePasswordMutation,
} = userManagementApi;
