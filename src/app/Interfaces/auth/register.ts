export interface Login
{
  email: string,
  password: string,
  device_name: string ,
  operating_system: string,
}

export interface Register extends Login
{
  name : string ,
}
