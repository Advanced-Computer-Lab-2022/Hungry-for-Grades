
import axios from 'axios';

import {
  HttpResponse,
  PaginatedResponse
} from '@interfaces/response.interface';


import {
    ICourse
} from '@interfaces/course.interface';


const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export const StudentRoutes = {
    GET: {
        getMyCourses : 
        {
            URL : '/trainee/' as const,
            params : '',
            query : '',
            payload :'',
            response : {
                data : [
                    {
                    _course : {
                        price : {
                            currency:'',
                            currentValue : 0,
                            discounts : []
                        },
                        rating : {
                            averageRating : 0,
                            reviews : []
                        },
                        _id : '',
                        _instructor : [
                            {
                                rating : {
                                    reviews : []
                                },
                                _id : '',
                                name : '',
                                profileImage : ''
                            }
                        ],
                        captions : [''],
                        category : '',
                        duration : 0,
                        language : '',
                        level : '',
                        previewVideoURL :'',
                        subcategory : [''],
                        thubmnail : '',
                        title : '',
                        id:''
                    },
                    dateOfEnrollment : '',
                    _id : '',
                    notes : [],
                    examGrade : 0,
                    progress : 0
                    }
                ]
            }
        }
    }
  };

  export async function getMyCourses(
  ): Promise<PaginatedResponse<ICourse>> {
    const res = await axios.get<PaginatedResponse<ICourse>>(
      `${APP_BASE_API_URL}/student`,
      {
        params: ''
      }
    );
    if (res.statusText !== 'OK') {
      throw new Error(`server returned response status ${res.statusText}`);
    }
    if (!res.data.success) {
      throw new Error(`server returned error ${res.data.message}`);
    }
    return res.data;
  }
  