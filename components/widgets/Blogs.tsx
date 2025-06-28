'use client'

import React, { useEffect, useState } from 'react'
import Blog from '../ui/Blog'
import { getBlogs } from '@/app/actions/getBlogs'
import { BlogTypes } from '@/types/blog';
import Loader from '../ui/Loader';

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const foundData = await getBlogs();
        setBlogs(foundData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      {
        isLoading && (
          <Loader />
        )
      }
      <div className='w-full grid sm:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-3'>
        {
          blogs.map((item, index) => (
            <Blog
              description={item.description}
              title={item.title}
              image={item.image}
              id={item.id}
              userId={item.userId}
              content={item.content}
              createdAt={item.createdAt}
              key={index}
            />
          ))
        }
      </div>
    </>
  )
}

export default Blogs