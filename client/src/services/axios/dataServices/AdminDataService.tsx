
export const AdminRoutes = {

  POST:{
    createAdmin: {
        URL : '/admin' as const,
        params: '',
        payload : {
            'email':{
                'address':''
            },
            'password':'',
            'username':'',
            'name':'',
            'address':{
                'city':'',
                'country':''
            },
            'role':'Admin' as const
        },
        response: {
            'message':'',
            'success':''
        }
    }
  }
};

