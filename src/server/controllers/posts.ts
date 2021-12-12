/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

import { log } from '../../helper';

interface Post {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    const posts: [Post] = result.data;

    return res.status(200).json({
      data: posts,
    });
  } catch (error) {
    log.info({ req: { status: 500, error } }, 'getPosts don`t completed :(');

    return res.status(500).json({
      error,
    });
  }
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    let post: Post = result.data;

    return res.status(200).json({
      data: post,
    });
  } catch (error) {
    log.info({ req: { status: 500, error } }, 'getPost don`t completed :(');

    return res.status(500).json({
      error,
    });
  }
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        ...(title && { title }),
        ...(body && { body }),
      }
    );

    return res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    log.info({ req: { status: 500, error } }, 'updatePost don`t completed :(');

    return res.status(500).json({
      error,
    });
  }
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    return res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    log.info({ req: { status: 500, error } }, 'deletePost don`t completed :(');

    return res.status(500).json({
      error,
    });
  }
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      {
        title,
        body,
      }
    );

    return res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    log.info({ req: { status: 500, error } }, 'addPost don`t completed :(');

    return res.status(500).json({
      error,
    });
  }
};

export default { getPosts, getPost, updatePost, deletePost, addPost };
