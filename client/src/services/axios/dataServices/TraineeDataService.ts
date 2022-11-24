export const TraineeRoutes = {
	GET: {
		getMyCourses: {
			URL: '',
			params: '',
			query: '',
			payload: '',
			response: {
				data: [
					{
						_course: {
							price: {
								currency: '',
								currentValue: 0,
								discounts: []
							},
							rating: {
								averageRating: 0,
								reviews: []
							},
							_id: '',
							_instructor: [
								{
									rating: {
										reviews: []
									},
									_id: '',
									name: '',
									profileImage: ''
								}
							],
							captions: [''],
							category: '',
							duration: 0,
							language: '',
							level: '',
							previewVideoURL: '',
							subcategory: [''],
							thubmnail: '',
							title: '',
							id: ''
						},
						dateOfEnrollment: '',
						_id: '',
						notes: [],
						examGrade: 0,
						progress: 0
					}
				]
			}
		},
		getMyCart: {
			URL: '',
			params: '',
			query: '',
			payload: '',
			response: {
				data: [
					{
						price: {
							currency: '',
							currentValue: 0,
							discounts: []
						},
						rating: {
							averageRating: 0,
							reviews: []
						},
						_id: '',
						_instructor: [
							{
								rating: {
									averageRating: 0,
									reviews: []
								},
								_id: '',
								name: '',
								profileImage: '',
								speciality: '',
								title: ''
							}
						],
						category: '',
						description: '',
						subcategory: [''],
						thumbnail: '',
						title: '',
						id: ''
					}
				]
			}
		}
	},
	POST: {
		signup: {
			URL: '/trainee/signup' as const,
			params: '',
			query: '',
			payload: {
				firstName: '',
				lastName: '',
				birthDate: '',
				phone: '',
				email: {
					address: ''
				},
				username: '',
				password: '',
				gender: '',
				country: ''
			},
			response: {
				data: {
					accessToken: '',
					refreshToken: ''
				}
			}
		}
	}
};
