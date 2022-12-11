import * as Express from "express";

declare namespace Express {
  export interface Request {
    user?: any
  }
}