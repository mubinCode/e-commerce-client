"use server"


export const createCustomer = async (payload : FormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create-customer`,
      {
        method: "POST",
        body: payload,
        cache: "no-store"
      }
    );
    const customerInfo = await res.json();
  return customerInfo;
}