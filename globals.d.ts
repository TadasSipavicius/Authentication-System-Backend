import * as Express from "express";

declare module "Express" {
  interface Request {
    user?: any
  }
}