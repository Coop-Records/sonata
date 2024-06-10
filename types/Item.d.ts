export type Item = {
  user?:{
    fid: number
  },
  fid: number;
  fname: string;
}


export type ILike = {
  user:{
    fid: number
  },
}