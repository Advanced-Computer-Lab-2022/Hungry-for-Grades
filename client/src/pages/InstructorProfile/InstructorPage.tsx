/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { AiFillLinkedin, AiFillGithub, AiFillYoutube } from 'react-icons/ai';

import { BiWorld } from 'react-icons/bi';

import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import styles from './InstructorPage.module.scss';

import CourseList from './CourseList';


import ReviewSection from './ReviewSection';

import ReviewList from './ReviewList';

import Loader from '@components/loader/loaderpage/Loader';

import ReviewContainer from '@components/reviewHolder/ReviewContainer';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { getRequest } from '@/services/axios/http-verbs';


async function getInstructor(id: string) {
  const Inst = InstructorRoutes.GET.getInstructor;

  Inst.params = id;

  return getRequest(Inst);
}

export default function InstructorPage(props: { text: string }) {
  const instructorId = props.text;

  const { isLoading, data } = useQuery(
    ['getInstructorNow'],
    () => getInstructor(instructorId),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000 // 1 second
    }
  );

  const Instructor = data?.data?.data;

  if (isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <img
            alt='Instructor'
            className={styles.instructor_img}
            src={Instructor?.profileImage}
          />
          <div className={styles.social_wrapper}>
            {Instructor?.socialMedia.linkedin.length > 0 && (
              <a href={Instructor.socialMedia.linkedin}>
                {' '}
                <AiFillLinkedin style={{ fontSize: '2rem' }} />{' '}
              </a>
            )}
            {Instructor?.socialMedia.github.length > 0 && (
              <a href={Instructor.socialMedia.github}>
                {' '}
                <AiFillGithub
                  style={{ fontSize: '2rem', color: '#112D4E' }}
                />{' '}
              </a>
            )}
            {Instructor?.socialMedia.youtube.length > 0 && (
              <a href={Instructor.socialMedia.youtube}>
                {' '}
                <AiFillYoutube
                  style={{ fontSize: '2rem', color: 'red' }}
                />{' '}
              </a>
            )}
            {Instructor?.socialMedia.personalWebsite.length > 0 && (
              <a href={Instructor.socialMedia.personalWebsite}>
                {' '}
                <BiWorld style={{ fontSize: '2rem', color: 'grey' }} />{' '}
              </a>
            )}
          </div>
        </div>
        <div className={styles.hero1}>
          <div className={styles.title}>Instructor</div>
          <h1>{Instructor.name}</h1>
          <h2>{Instructor.speciality}</h2>
          <h3 style={{ fontWeight: '700', fontSize: '1.2rem', color: 'grey' }}>
            {Instructor.title}
          </h3>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '1.5rem' }}>
              <div className={styles.property}>Rating</div>
              <div className={styles.value}>
                {Instructor.rating.averageRating}
              </div>
            </div>
            <div>
              <div className={styles.property}>Reviews</div>
              <div className={styles.value}>554,468</div>
            </div>
          </div>

          <h2>About me</h2>
          <div className={styles.data}>{Instructor.biography}</div>
        </div>
      </div>
      <CourseList text={instructorId} />
      <ReviewSection />
      <div>
        <h2 style={{ fontWeight: '700', fontSize: '1.6rem' }}>Reviews</h2>
        <ReviewList text={instructorId} />
      </div>
    </div>
  );
}
