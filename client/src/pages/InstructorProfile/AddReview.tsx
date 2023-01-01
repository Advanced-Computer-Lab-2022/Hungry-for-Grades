import React, { useState } from 'react';

import { toast } from 'react-toastify';

import ControlledStarsRating from '@/components/starsRating/ControlledStarsRating';
import usePostQuery from '@/hooks/usePostQuery';
import usePatchQuery from '@/hooks/usePatchQuery';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { UseUser } from '@/store/userStore';
import { toastOptions } from '@/components/toast/options';

export default function AddReview(props: {
  isUpdating: boolean;
  instructorID: string;
  updateFunction: () => void;
}) {
  const [rating, setRating] = useState(0);

  const user = UseUser();

  const [message, setMessage] = useState('');

  const { mutateAsync: submitNewReview } = usePostQuery();
  const { mutateAsync: submitUpdateReview } = usePatchQuery();

  const handleMessageChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // 👇️ access textarea value
    setMessage(event.target.value);
  };

  async function handleSubmit() {
    if (!props?.isUpdating) {
      const rev = InstructorRoutes.POST.userAddReview;

      rev.URL = `/instructor/rating/${props.instructorID}/trainee/${
        user?._id as string
      }`;

      rev.payload = {
        _trainee: {
          _id: user?._id
        },
        comment: message,
        createdAt: new Date(),
        rating: rating
      };

      await submitNewReview(rev);
    } else {
      const rev = InstructorRoutes.PATCH.userUpdateReview;

      rev.URL = `/instructor/rating/${props?.instructorID}/trainee/${
        user?._id as string
      }`;

      rev.payload = {
        comment: message,
        rating: rating
      };

      await submitUpdateReview(rev);
    }
    toast.success('Your Review is sent successfully', toastOptions);
    props?.updateFunction();
  }

  return (
    <div>
      <ControlledStarsRating rating={rating} setRating={setRating} />

      <textarea
        aria-label='With textarea'
        className='form-control'
        placeholder='Write Review'
        style={{ marginBottom: '2rem' }}
        value={message}
        onChange={handleMessageChange}
      />

      <button
        style={{
          border: 'none',
          backgroundColor: '#a00407',
          color: 'white',
          borderRadius: '10px'
        }}
        type='button'
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
    </div>
  );
}
