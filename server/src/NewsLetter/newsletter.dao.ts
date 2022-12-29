import { INewsletter } from './newsletter.interface';
import { HttpException } from '@/Exceptions/HttpException';
import { PaginatedData } from '@/Utils/PaginationResponse';
import { type INewsLetterFilters } from './newsletter.types';
import newsLetterModel from './newsletter.model';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';

class NewsLetterService {
  public getAllEmails = async (filters: INewsLetterFilters): Promise<PaginatedData<INewsletter>> => {
    const { page = 1, limit = '12', email = '', role = '', sortBy = -1, all = 0 } = filters;
    const pageLimit: number = parseInt(`${limit}`) ?? 12;
    const toBeSkipped = (parseInt(`${page}`) - 1) * pageLimit ?? 0;

    const aggregateQuery: any[] = [
      {
        $match: {
          $and: [{ email: { $options: 'i', $regex: email }, role: { $options: 'i', $regex: role ?? '' } }],
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { email: parseInt(`${sortBy}`) },
      },
    ];

    if (all === 0) {
      aggregateQuery.push(
        {
          $skip: toBeSkipped,
        },
        {
          $limit: pageLimit,
        },
      );
    }

    let queryResult: INewsletter[];
    let count: { count: number }[] | undefined;
    try {
      queryResult = await newsLetterModel.aggregate(aggregateQuery);
      if (!queryResult) throw new HttpException(HttpStatusCodes.NOT_FOUND, `No NewsLetter found with the email: ${email} and role: ${role}`);
      count = await newsLetterModel.aggregate([
        {
          $match: {
            $and: [{ email: { $options: 'i', $regex: email }, role: { $options: 'i', $regex: role ?? '' } }],
          },
        },
        {
          $count: 'count',
        },
      ]);
    } catch (error) {
      throw new HttpException(500, 'Internal error occured while fetching from database');
    }
    const totalEmails: number = count && count?.length > 0 ? count[0].count : 0;
    const totalPages = Math.ceil(totalEmails / pageLimit);

    return {
      data: queryResult,
      page: page,
      pageSize:
        all === 0
          ? parseInt(`${limit}`) < parseInt(`${totalEmails}`)
            ? parseInt(`${limit}`)
            : parseInt(`${totalEmails}`)
          : parseInt(`${totalEmails}`),
      totalPages: totalPages,
      totalResults: totalEmails,
    };
  };

  public unsubscribe = async (body: { email: string }): Promise<{ data: number }> => {
    const { email = '' } = body;
    const deletedUser = await newsLetterModel.deleteOne({ email });
    if (!deletedUser) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");
    return { data: deletedUser.deletedCount };
  };
  public subscribe = async (body: INewsletter): Promise<{ data: INewsletter }> => {
    const newsLetterUser = await newsLetterModel.create(body);
    return { data: newsLetterUser };
  };
}

export default NewsLetterService;
