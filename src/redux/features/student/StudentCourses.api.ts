import { TResponseRedux } from "../../../types/global.types";
import { TStudentOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const StudentCoursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentOfferedCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (
        response: TResponseRedux<TStudentOfferedCourse[]>
      ) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    getMyEnrolledCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/enrolled-courses/my-enrolled-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
       
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // addStudent: builder.mutation({
    //   query: (data) => ({
    //     url: "/users/create-student",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useGetStudentOfferedCourseQuery, useGetMyEnrolledCoursesQuery } =
  StudentCoursesApi;
