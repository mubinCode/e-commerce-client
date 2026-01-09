// 'use client';

// import { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/context/CartContext';
// import { toast } from 'sonner';
// import { 
//   Container, 
//   Box, 
//   Typography, 
//   Stack, 
//   Grid, 
//   Button,
//   Paper,
//   Divider
// } from '@mui/material';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useAuth } from '@/context/useAuth';
// import RUForm from '@/components/ReUsableForms/RUForm';
// import RUInput from '@/components/ReUsableForms/RUInput';
// import { useGetSelectedCartMutation } from '@/redux/api/cartApi';
// import { FieldValues } from 'react-hook-form';
// import RUSelectField from '@/components/ReUsableForms/RUSelectField';
// import { OrderPayload } from '@/types';

// const checkoutValidationSchema = z.object({

//     deliveryType: z.enum(['HOME', 'PICKUP'] as const, {
//         message: "Delivery type is required",
//       }),
//     address: z.string().optional(),
//     city: z.string().optional(),
//     country: z.string().optional(),
//     pickupPointId: z.string().optional(),
//     contactNumber: z.string().min(10, "Valid phone number required"),
//     paymentMethod: z.enum(['CASH_ON_DELIVERY', 'ONLINE_PAYMENT'] as const, {
//       message: "Payment method is required",
//     }),
//   }).refine((data) => {
//     // If HOME delivery, address, city, country are required
//     if (data.deliveryType === 'HOME') {
//       return data.address && data.address.length >= 10 && 
//              data.city && data.city.length >= 2 && 
//              data.country && data.country.length >= 2;
//     }
//     return true;
//   }, {
//     message: "Address, city, and country are required for home delivery",
//     path: ['address'],
//   }).refine((data) => {
//     // If PICKUP delivery, pickupPointId is required
//     if (data.deliveryType === 'PICKUP') {
//       return data.pickupPointId && data.pickupPointId.length > 0;
//     }
//     return true;
//   }, {
//     message: "Pickup point is required for pickup delivery",
//     path: ['pickupPointId'],
//   });
  
//   interface CartVariant {
//     id: string;
//     productName: string;
//     price: number;
//     image: string | null;
//     size: string;
//     variantQuantity: number;
//   }
//   interface IPickupPoint {
//     id: string
//     name: string
//     address: string
//   }

// //   const DeliveryFields = ({ pickupPoints, userInfo }: any) => {
// //     const { control } = useFormContext();
// //     const deliveryType = useWatch({ control, name: 'deliveryType' });
  
// //     return (
// //       <>
// //         {/* Contact Number - Always visible */}
// //         <RUInput
// //           name="contactNumber"
// //           label="Contact Number"
// //           type="tel"
// //           fullWidth
// //           placeholder="+8801700000000"
// //         />
  
// //         {/* HOME Delivery Fields */}
// //         {deliveryType === 'HOME' && (
// //           <>
// //             <RUInput
// //               name="address"
// //               label="Delivery Address"
// //               fullWidth
// //               placeholder="123 Example Street"
// //             />
  
// //             <Grid container spacing={2}>
// //               <Grid size={{xs:12, sm:6}}>
// //                 <RUInput
// //                   name="city"
// //                   label="City"
// //                   fullWidth
// //                   placeholder="Dhaka"
// //                 />
// //               </Grid>
// //               <Grid size={{xs:12, sm:6}}>
// //                 <RUInput
// //                   name="country"
// //                   label="Country"
// //                   fullWidth
// //                   placeholder="Bangladesh"
// //                 />
// //               </Grid>
// //             </Grid>
// //           </>
// //         )}
  
// //         {/* PICKUP Delivery Fields */}
// //         {deliveryType === 'PICKUP' && pickupPoints.length > 0 && (
// //           <Box>
// //             <Controller
// //               control={control}
// //               name="pickupPointId"
// //               render={({ field, fieldState }) => (
// //                 <TextField
// //                   {...field}
// //                   select
// //                   label="Select Pickup Point"
// //                   required
// //                   fullWidth
// //                   size="small"
// //                   error={!!fieldState.error}
// //                   helperText={fieldState.error?.message}
// //                 >
// //                   {pickupPoints.map((point: any) => (
// //                     <MenuItem key={point.id} value={point.id}>
// //                       {point.name} - {point.address}
// //                     </MenuItem>
// //                   ))}
// //                 </TextField>
// //               )}
// //             />
// //           </Box>
// //         )}
// //       </>
// //     );
// //   };
  
//   const CheckoutPage = () => {
//     const router = useRouter();
//     const { effectiveCart } = useCart();
//     const userInfo = useAuth();
//     const isLoggedIn = !!userInfo?.role;
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [deliveryType, setDeliveryType] = useState<'HOME' | 'PICKUP'>('HOME');
//     const [pickupPoints, setPickupPoints] = useState<IPickupPoint[]>([]);
  
//     const cartItemIds = useMemo(() => effectiveCart.map((item) => item.variantId), [effectiveCart]);
//     const [getSelectedCart, { data: cartData, isLoading }] = useGetSelectedCartMutation();
  
//     // Fetch pickup points
//     useEffect(() => {
//       const fetchPickupPoints = async () => {
//         try {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/distribution-point`);
//           const data = await response.json();
//           setPickupPoints(data.data || []);
//         } catch (error) {
//           console.error('Failed to fetch pickup points:', error);
//         }
//       };
//       fetchPickupPoints();
//     }, []);
  
//     // Fetch product variant data
//     useEffect(() => {
//       if (cartItemIds.length === 0) return;
//       getSelectedCart({ ids: cartItemIds }).unwrap().catch(console.error);
//     }, [getSelectedCart, cartItemIds]);
  
//     // Merge cart with product data
//     const mergedCart = useMemo(() => {
//       return effectiveCart.map((item) => {
//         const variant = cartData?.find(
//           (v: CartVariant) => v.id === item.variantId
//         );
//         return {
//           ...item,
//           price: variant?.price ?? 0,
//           name: variant?.productName ?? "",
//           image: variant?.image ?? null,
//           size: variant?.size ?? "S",
//           variantQuantity: variant?.variantQuantity ?? 0
//         };
//       });
//     }, [effectiveCart, cartData]);
  
//     // Protect checkout page - redirect if not logged in
//     useEffect(() => {
//       if (!isLoggedIn) {
//         sessionStorage.setItem('redirectAfterLogin', '/checkout');
//         router.push('/login?redirect=checkout');
//       }
//     }, [isLoggedIn, router]);
  
//     // Redirect if cart is empty
//     useEffect(() => {
//       if (isLoggedIn && effectiveCart.length === 0) {
//         toast.error("Your cart is empty");
//         router.push('/');
//       }
//     }, [effectiveCart, isLoggedIn, router]);
  
//     const subtotal = mergedCart.reduce(
//       (sum, item) => sum + (item.price || 0) * item.quantity, 
//       0
//     );
//     const deliveryFee = 20;
//     const total = subtotal + deliveryFee;
  
//     const handleCheckout = async (data: FieldValues) => {
//       setIsSubmitting(true);
      
//       try {
//         const orderPayload: OrderPayload = {
//             contactNumber: data.contactNumber,
//             deliveryType: data.deliveryType,
//             paymentMethod: data.paymentMethod,
//             items: mergedCart.map(item => ({
//               variantId: item.variantId,
//               quantity: item.quantity,
//               price: item.price,
//             })),
//             subtotal,
//             deliveryFee,
//             total,
//             ...(data.deliveryType === "HOME"
//               ? {
//                   address: data.address,
//                   city: data.city,
//                   country: data.country,
//                 }
//               : {
//                   pickupPointId: data.pickupPointId,
//                 }),
//           };
          
  
//         // Call your order creation API
//         const response = await createOrder(orderPayload);
        
//         if (response?.data?.id) {
//           toast.success("Order placed successfully!");
          
//           // Clear cart after successful order
//           // This will be handled by your backend
          
//           // Redirect to order confirmation page
//           router.push(`/order-confirmation/${response.data.id}`);
//         } else {
//           toast.error(response?.message || "Failed to place order");
//         }
//       } catch (error) {
//         console.error("Checkout error:", error);
//         toast.error("An error occurred during checkout");
//       } finally {
//         setIsSubmitting(false);
//       }
//     };
  
//     if (!isLoggedIn || isLoading) {
//       return (
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//           <Typography>Loading...</Typography>
//         </Container>
//       );
//     }
  
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Typography variant="h4" fontWeight={600} mb={4}>
//           Checkout
//         </Typography>
  
//         <Grid container spacing={4}>
//           {/* Checkout Form */}
//           <Grid size={{xs:12, sm:7}}>
//             <Paper elevation={2} sx={{ p: 3 }}>
//               <Typography variant="h6" fontWeight={600} mb={3}>
//                 Delivery Information
//               </Typography>
  
//               <RUForm
//                 onSubmit={handleCheckout}
//                 resolver={zodResolver(checkoutValidationSchema)}
//               >
//                 <Stack spacing={3}>
//                   {/* Delivery Type */}
//                   <RUSelectField
//                     name="deliveryType"
//                     label="Delivery Type"
//                     items={['HOME', 'PICKUP'].map(point => ({
//                         label: `${point}`,
//                         value: point
//                       }))}
//                     required
//                     fullWidth
//                     size="small"
//                   />
  
//                   {/* Contact Number */}
//                   <RUInput
//                     name="contactNumber"
//                     label="Contact Number"
//                     type="tel"
//                     fullWidth
//                     placeholder="+8801700000000"
//                   />
  
//                   {/* HOME Delivery Fields */}
//                   {deliveryType === 'HOME' && (
//                     <>
//                       <RUInput
//                         name="address"
//                         label="Delivery Address"
//                         fullWidth
//                         placeholder="123 Example Street"
//                       />
  
//                       <Grid container spacing={2}>
//                         <Grid size={{xs:12, sm:6}}>
//                           <RUInput
//                             name="city"
//                             label="City"
//                             fullWidth
//                             placeholder="Dhaka"
//                           />
//                         </Grid>
//                         <Grid size={{xs:12, sm:6}}>
//                           <RUInput
//                             name="country"
//                             label="Country"
//                             fullWidth
//                             placeholder="Bangladesh"
//                           />
//                         </Grid>
//                       </Grid>
//                     </>
//                   )}
  
//                   {/* PICKUP Delivery Fields */}
//                   {deliveryType === 'PICKUP' && (
//                     <RUSelectField
//                       name="pickupPointId"
//                       label="Select Pickup Point"
//                       items={pickupPoints.map(point => ({
//                         label: `${point.name} - ${point.address}`,
//                         value: point.id,
//                       }))}
//                       required
//                       fullWidth
//                       size="small"
//                     />
//                   )}
  
//                   {/* Payment Method */}
//                   <RUSelectField
//                     name="paymentMethod"
//                     label="Payment Method"
//                     items={['CASH_ON_DELIVERY', 'ONLINE_PAYMENT'].map(point => ({
//                         label: `${point}`,
//                         value: point
//                       }))}
//                     required
//                     fullWidth
//                     size="small"
//                   />
  
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     size="large"
//                     fullWidth
//                     disabled={isSubmitting}
//                     sx={{ mt: 2 }}
//                   >
//                     {isSubmitting ? 'Processing...' : `Place Order - ${total.toFixed(2)}`}
//                   </Button>
//                 </Stack>
//               </RUForm>
//             </Paper>
//           </Grid>
  
//           {/* Order Summary */}
//           <Grid size={{xs:12, sm:5}}>
//             <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
//               <Typography variant="h6" fontWeight={600} mb={3}>
//                 Order Summary
//               </Typography>
  
//               <Stack spacing={2} mb={3}>
//                 {mergedCart.map((item) => (
//                   <Box key={item.variantId}>
//                     <Stack direction="row" justifyContent="space-between" alignItems="center">
//                       <Box>
//                         <Typography variant="body2" fontWeight={500}>
//                           {item.name}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           Size: {item.size} • Qty: {item.quantity}
//                         </Typography>
//                       </Box>
//                       <Typography variant="body2" fontWeight={500}>
//                         ${((item.price || 0) * item.quantity).toFixed(2)}
//                       </Typography>
//                     </Stack>
//                   </Box>
//                 ))}
//               </Stack>
  
//               <Divider sx={{ my: 2 }} />
  
//               <Stack spacing={1}>
//                 <Stack direction="row" justifyContent="space-between">
//                   <Typography variant="body2">Subtotal</Typography>
//                   <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
//                 </Stack>
  
//                 <Stack direction="row" justifyContent="space-between">
//                   <Typography variant="body2">Delivery Fee</Typography>
//                   <Typography variant="body2">${deliveryFee.toFixed(2)}</Typography>
//                 </Stack>
  
//                 <Divider sx={{ my: 1 }} />
  
//                 <Stack direction="row" justifyContent="space-between">
//                   <Typography variant="h6" fontWeight={600}>Total</Typography>
//                   <Typography variant="h6" fontWeight={600} color="primary">
//                     ${total.toFixed(2)}
//                   </Typography>
//                 </Stack>
//               </Stack>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     );
//   };
  
//   export default CheckoutPage;

// 'use client';

// import { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/context/CartContext';
// import { toast } from 'sonner';
// import { 
//   Container, 
//   Box, 
//   Typography, 
//   Stack, 
//   Grid, 
//   Button,
//   Paper,
//   Divider
// } from '@mui/material';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useAuth } from '@/context/useAuth';
// import RUForm from '@/components/ReUsableForms/RUForm';
// import RUInput from '@/components/ReUsableForms/RUInput';
// import { useGetSelectedCartMutation } from '@/redux/api/cartApi';
// import { FieldValues } from 'react-hook-form';
// import RUSelectField from '@/components/ReUsableForms/RUSelectField';
// import { OrderPayload } from '@/types';
// import { useWatch } from 'react-hook-form';
// import { useCreateOrderMutation } from '@/redux/api/orderApi';

// const checkoutValidationSchema = z.object({
//   deliveryType: z.enum(['HOME', 'PICKUP'] as const, {
//     message: "Delivery type is required",
//   }),
//   address: z.string().optional(),
//   city: z.string().optional(),
//   country: z.string().optional(),
//   pickupPointId: z.string().optional(),
//   contactNumber: z.string().min(10, "Valid phone number required"),
//   paymentMethod: z.enum(['CASH_ON_DELIVERY', 'ONLINE_PAYMENT'] as const, {
//     message: "Payment method is required",
//   }),
// }).refine((data) => {
//   if (data.deliveryType === 'HOME') {
//     return data.address && data.address.length >= 10 && 
//            data.city && data.city.length >= 2 && 
//            data.country && data.country.length >= 2;
//   }
//   return true;
// }, {
//   message: "Address, city, and country are required for home delivery",
//   path: ['address'],
// }).refine((data) => {
//   if (data.deliveryType === 'PICKUP') {
//     return data.pickupPointId && data.pickupPointId.length > 0;
//   }
//   return true;
// }, {
//   message: "Pickup point is required for pickup delivery",
//   path: ['pickupPointId'],
// });

// interface CartVariant {
//   id: string;
//   productName: string;
//   price: number;
//   image: string | null;
//   size: string;
//   variantQuantity: number;
// }

// interface IPickupPoint {
//   id: string;
//   name: string;
//   address: string;
// }

// // Separate component for dynamic fields
// const DynamicDeliveryFields = ({ pickupPoints }: { pickupPoints: IPickupPoint[] }) => {
//   const deliveryType = useWatch({ name: 'deliveryType' });

//   return (
//     <>
//       {deliveryType === 'HOME' && (
//         <>
//           <RUInput
//             name="address"
//             label="Delivery Address"
//             fullWidth
//             placeholder="123 Example Street"
//           />

//           <Grid container spacing={2}>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <RUInput
//                 name="city"
//                 label="City"
//                 fullWidth
//                 placeholder="Dhaka"
//               />
//             </Grid>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <RUInput
//                 name="country"
//                 label="Country"
//                 fullWidth
//                 placeholder="Bangladesh"
//               />
//             </Grid>
//           </Grid>
//         </>
//       )}

//       {deliveryType === 'PICKUP' && pickupPoints.length > 0 && (
//         <RUSelectField
//           name="pickupPointId"
//           label="Select Pickup Point"
//           items={pickupPoints.map(point => ({
//             label: `${point.name} - ${point.address}`,
//             value: point.id,
//           }))}
//           required
//           fullWidth
//           size="small"
//         />
//       )}
//     </>
//   );
// };

// const CheckoutPage = () => {
//   const router = useRouter();
//   const { effectiveCart } = useCart();
//   const userInfo = useAuth();
//   const isLoggedIn = !!userInfo?.role;
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [pickupPoints, setPickupPoints] = useState<IPickupPoint[]>([]);

//   const cartItemIds = useMemo(() => effectiveCart.map((item) => item.variantId), [effectiveCart]);
//   const [getSelectedCart, { data: cartData, isLoading }] = useGetSelectedCartMutation();
//   const [createOrder] = useCreateOrderMutation();

//   // Fetch pickup points
//   useEffect(() => {
//     const fetchPickupPoints = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/distribution-point`);
//         const data = await response.json();
//         setPickupPoints(data.data || []);
//       } catch (error) {
//         console.error('Failed to fetch pickup points:', error);
//       }
//     };
//     fetchPickupPoints();
//   }, []);

//   // Fetch product variant data
//   useEffect(() => {
//     if (cartItemIds.length === 0) return;
//     getSelectedCart({ ids: cartItemIds }).unwrap().catch(console.error);
//   }, [getSelectedCart, cartItemIds]);

//   // Merge cart with product data
//   const mergedCart = useMemo(() => {
//     return effectiveCart.map((item) => {
//       const variant = cartData?.find(
//         (v: CartVariant) => v.id === item.variantId
//       );
//       return {
//         ...item,
//         price: variant?.price ?? 0,
//         name: variant?.productName ?? "",
//         image: variant?.image ?? null,
//         size: variant?.size ?? "S",
//         variantQuantity: variant?.variantQuantity ?? 0
//       };
//     });
//   }, [effectiveCart, cartData]);

//   // Protect checkout page
//   useEffect(() => {
//     if (!isLoggedIn) {
//       sessionStorage.setItem('redirectAfterLogin', '/checkout');
//       router.push('/login?redirect=checkout');
//     }
//   }, [isLoggedIn, router]);

//   // Redirect if cart is empty
//   useEffect(() => {
//     if (isLoggedIn && effectiveCart.length === 0) {
//       toast.error("Your cart is empty");
//       router.push('/');
//     }
//   }, [effectiveCart, isLoggedIn, router]);

//   const subtotal = mergedCart.reduce(
//     (sum, item) => sum + (item.price || 0) * item.quantity, 
//     0
//   );
//   const deliveryFee = 60;
//   const total = subtotal + deliveryFee;

//   const handleCheckout = async (data: FieldValues) => {
//     setIsSubmitting(true);
    
//     try {
//       const orderPayload: OrderPayload = {
//         contactNumber: data.contactNumber,
//         deliveryType: data.deliveryType,
//         paymentMethod: data.paymentMethod,
//         items: mergedCart.map(item => ({
//           variantId: item.variantId,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//         subtotal,
//         deliveryFee,
//         total,
//         ...(data.deliveryType === "HOME"
//           ? {
//               address: data.address,
//               city: data.city,
//               country: data.country,
//             }
//           : {
//               pickupPointId: data.pickupPointId,
//             }),
//       };

//       // Call your order creation API
//       const response = await createOrder(orderPayload).unwrap();
//       console.log(response);
//       if (response?.orderId) {
//         toast.success("Order placed successfully!");
//         router.push(`/order-confirmation/${response.orderId}`);
//       } else {
//         toast.error(response?.message || "Failed to place order");
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//       toast.error("An error occurred during checkout");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isLoggedIn || isLoading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Typography>Loading...</Typography>
//       </Container>
//     );
//   }

//   // Define default values with all fields initialized
//   const defaultValues = {
//     deliveryType: 'HOME' as const,
//     address: '',
//     city: '',
//     country: '',
//     pickupPointId: '',
//     contactNumber: '',
//     paymentMethod: 'CASH_ON_DELIVERY' as const,
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" fontWeight={600} mb={4}>
//         Checkout
//       </Typography>

//       <Grid container spacing={4}>
//         {/* Checkout Form */}
//         <Grid size={{ xs: 12, sm: 7 }}>
//           <Paper elevation={2} sx={{ p: 3 }}>
//             <Typography variant="h6" fontWeight={600} mb={3}>
//               Delivery Information
//             </Typography>

//             <RUForm
//               onSubmit={handleCheckout}
//               resolver={zodResolver(checkoutValidationSchema)}
//               defaultValues={defaultValues}
//             >
//               <Stack spacing={3}>
//                 {/* Delivery Type */}
//                 <RUSelectField
//                   name="deliveryType"
//                   label="Delivery Type"
//                   items={['HOME', 'PICKUP'].map(type => ({
//                     label: type,
//                     value: type
//                   }))}
//                   required
//                   fullWidth
//                   size="small"
//                 />

//                 {/* Contact Number */}
//                 <RUInput
//                   name="contactNumber"
//                   label="Contact Number"
//                   type="tel"
//                   fullWidth
//                   placeholder="+8801700000000"
//                 />

//                 {/* Dynamic Fields based on delivery type */}
//                 <DynamicDeliveryFields pickupPoints={pickupPoints} />

//                 {/* Payment Method */}
//                 <RUSelectField
//                   name="paymentMethod"
//                   label="Payment Method"
//                   items={['CASH_ON_DELIVERY', 'ONLINE_PAYMENT'].map(method => ({
//                     label: method.replace('_', ' '),
//                     value: method
//                   }))}
//                   required
//                   fullWidth
//                   size="small"
//                 />

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   fullWidth
//                   disabled={isSubmitting}
//                   sx={{ mt: 2 }}
//                 >
//                   {isSubmitting ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
//                 </Button>
//               </Stack>
//             </RUForm>
//           </Paper>
//         </Grid>

//         {/* Order Summary */}
//         <Grid size={{ xs: 12, sm: 5 }}>
//           <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
//             <Typography variant="h6" fontWeight={600} mb={3}>
//               Order Summary
//             </Typography>

//             <Stack spacing={2} mb={3}>
//               {mergedCart.map((item) => (
//                 <Box key={item.variantId}>
//                   <Stack direction="row" justifyContent="space-between" alignItems="center">
//                     <Box>
//                       <Typography variant="body2" fontWeight={500}>
//                         {item.name}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Size: {item.size} • Qty: {item.quantity}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body2" fontWeight={500}>
//                       ${((item.price || 0) * item.quantity).toFixed(2)}
//                     </Typography>
//                   </Stack>
//                 </Box>
//               ))}
//             </Stack>

//             <Divider sx={{ my: 2 }} />

//             <Stack spacing={1}>
//               <Stack direction="row" justifyContent="space-between">
//                 <Typography variant="body2">Subtotal</Typography>
//                 <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
//               </Stack>

//               <Stack direction="row" justifyContent="space-between">
//                 <Typography variant="body2">Delivery Fee</Typography>
//                 <Typography variant="body2">${deliveryFee.toFixed(2)}</Typography>
//               </Stack>

//               <Divider sx={{ my: 1 }} />

//               <Stack direction="row" justifyContent="space-between">
//                 <Typography variant="h6" fontWeight={600}>Total</Typography>
//                 <Typography variant="h6" fontWeight={600} color="primary">
//                   ${total.toFixed(2)}
//                 </Typography>
//               </Stack>
//             </Stack>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default CheckoutPage;

// 'use client';

// import { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/context/CartContext';
// import { toast } from 'sonner';
// import { 
//   Container, 
//   Box, 
//   Typography, 
//   Stack, 
//   Grid, 
//   Button,
//   Paper,
//   Divider,
//   CircularProgress
// } from '@mui/material';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useAuth } from '@/context/useAuth';
// import RUForm from '@/components/ReUsableForms/RUForm';
// import RUInput from '@/components/ReUsableForms/RUInput';
// import { useGetSelectedCartMutation } from '@/redux/api/cartApi';
// import { FieldValues } from 'react-hook-form';
// import RUSelectField from '@/components/ReUsableForms/RUSelectField';
// import { OrderPayload } from '@/types';
// import { useWatch } from 'react-hook-form';
// import { useCreateOrderMutation, useInitiatePaymentMutation } from '@/redux/api/orderApi';

// const checkoutValidationSchema = z.object({
//   deliveryType: z.enum(['HOME', 'PICKUP'] as const, {
//     message: "Delivery type is required",
//   }),
//   address: z.string().optional(),
//   city: z.string().optional(),
//   country: z.string().optional(),
//   pickupPointId: z.string().optional(),
//   contactNumber: z.string().min(10, "Valid phone number required"),
//   paymentMethod: z.enum(['CASH_ON_DELIVERY', 'ONLINE_PAYMENT'] as const, {
//     message: "Payment method is required",
//   }),
// }).refine((data) => {
//   if (data.deliveryType === 'HOME') {
//     return data.address && data.address.length >= 10 && 
//            data.city && data.city.length >= 2 && 
//            data.country && data.country.length >= 2;
//   }
//   return true;
// }, {
//   message: "Address, city, and country are required for home delivery",
//   path: ['address'],
// }).refine((data) => {
//   if (data.deliveryType === 'PICKUP') {
//     return data.pickupPointId && data.pickupPointId.length > 0;
//   }
//   return true;
// }, {
//   message: "Pickup point is required for pickup delivery",
//   path: ['pickupPointId'],
// });

// interface CartVariant {
//   id: string;
//   productName: string;
//   price: number;
//   image: string | null;
//   size: string;
//   variantQuantity: number;
// }

// interface IPickupPoint {
//   id: string;
//   name: string;
//   address: string;
// }

// const DynamicDeliveryFields = ({ pickupPoints }: { pickupPoints: IPickupPoint[] }) => {
//   const deliveryType = useWatch({ name: 'deliveryType' });

//   return (
//     <>
//       {deliveryType === 'HOME' && (
//         <>
//           <RUInput
//             name="address"
//             label="Delivery Address"
//             fullWidth
//             placeholder="123 Example Street"
//           />

//           <Grid container spacing={2}>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <RUInput
//                 name="city"
//                 label="City"
//                 fullWidth
//                 placeholder="Dhaka"
//               />
//             </Grid>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <RUInput
//                 name="country"
//                 label="Country"
//                 fullWidth
//                 placeholder="Bangladesh"
//               />
//             </Grid>
//           </Grid>
//         </>
//       )}

//       {deliveryType === 'PICKUP' && pickupPoints.length > 0 && (
//         <RUSelectField
//           name="pickupPointId"
//           label="Select Pickup Point"
//           items={pickupPoints.map(point => ({
//             label: `${point.name} - ${point.address}`,
//             value: point.id,
//           }))}
//           required
//           fullWidth
//           size="small"
//         />
//       )}
//     </>
//   );
// };

// const CheckoutPage = () => {
//   const router = useRouter();
//   const { effectiveCart, clearCart } = useCart();
//   const userInfo = useAuth();
//   const isLoggedIn = !!userInfo?.role;
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [pickupPoints, setPickupPoints] = useState<IPickupPoint[]>([]);

//   const cartItemIds = useMemo(() => effectiveCart.map((item) => item.variantId), [effectiveCart]);
//   const [getSelectedCart, { data: cartData, isLoading }] = useGetSelectedCartMutation();
//   const [createOrder] = useCreateOrderMutation();
//   const [initiatePayment] = useInitiatePaymentMutation();

//   useEffect(() => {
//     const fetchPickupPoints = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/distribution-point`);
//         const data = await response.json();
//         setPickupPoints(data.data || []);
//       } catch (error) {
//         console.error('Failed to fetch pickup points:', error);
//       }
//     };
//     fetchPickupPoints();
//   }, []);

//   useEffect(() => {
//     if (cartItemIds.length === 0) return;
//     getSelectedCart({ ids: cartItemIds }).unwrap().catch(console.error);
//   }, [getSelectedCart, cartItemIds]);

//   const mergedCart = useMemo(() => {
//     return effectiveCart.map((item) => {
//       const variant = cartData?.find(
//         (v: CartVariant) => v.id === item.variantId
//       );
//       return {
//         ...item,
//         price: variant?.price ?? 0,
//         name: variant?.productName ?? "",
//         image: variant?.image ?? null,
//         size: variant?.size ?? "S",
//         variantQuantity: variant?.variantQuantity ?? 0
//       };
//     });
//   }, [effectiveCart, cartData]);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       sessionStorage.setItem('redirectAfterLogin', '/checkout');
//       router.push('/login?redirect=checkout');
//     }
//   }, [isLoggedIn, router]);

//   useEffect(() => {
//     if (isLoggedIn && effectiveCart.length === 0) {
//       toast.error("Your cart is empty");
//       router.push('/');
//     }
//   }, [effectiveCart, isLoggedIn, router]);

//   const subtotal = mergedCart.reduce(
//     (sum, item) => sum + (item.price || 0) * item.quantity, 
//     0
//   );
//   const deliveryFee = 60;
//   const total = subtotal + deliveryFee;

//   const handleCheckout = async (data: FieldValues) => {
//     setIsSubmitting(true);
    
//     try {
//       const orderPayload: OrderPayload = {
//         contactNumber: data.contactNumber,
//         deliveryType: data.deliveryType,
//         paymentMethod: data.paymentMethod,
//         items: mergedCart.map(item => ({
//           variantId: item.variantId,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//         subtotal,
//         deliveryFee,
//         total,
//         ...(data.deliveryType === "HOME"
//           ? {
//               address: data.address,
//               city: data.city,
//               country: data.country,
//             }
//           : {
//               pickupPointId: data.pickupPointId,
//             }),
//       };

//       if (data.paymentMethod === 'CASH_ON_DELIVERY') {
//         // COD: Create order directly
//         const response = await createOrder(orderPayload).unwrap();
        
//         if (response?.orderId) {
//           toast.success("Order placed successfully!");
//           clearCart(); // Clear cart after successful order
//           console.log("before_push from checkout");
//           router.push(`/order-confirmation/${response.orderId}`);
//           console.log("after_push from checkout");
//         } else {
//           toast.error(response?.message || "Failed to place order");
//         }
//       } else {
//         // ONLINE_PAYMENT: Initiate payment first
//         const paymentResponse = await initiatePayment(orderPayload).unwrap();
        
//         if (paymentResponse?.paymentUrl) {
//           // Save order data temporarily in sessionStorage for post-payment creation
//           sessionStorage.setItem('pendingOrder', JSON.stringify(orderPayload));
          
//           // Redirect to payment gateway
//           toast.info("Redirecting to payment gateway...");
//           window.location.href = paymentResponse.paymentUrl;
//         } else {
//           toast.error("Failed to initiate payment");
//         }
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//       toast.error("An error occurred during checkout");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isLoggedIn || isLoading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   const defaultValues = {
//     deliveryType: 'HOME' as const,
//     address: '',
//     city: '',
//     country: '',
//     pickupPointId: '',
//     contactNumber: '',
//     paymentMethod: 'CASH_ON_DELIVERY' as const,
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" fontWeight={600} mb={4}>
//         Checkout
//       </Typography>

//       <Grid container spacing={4}>
//         <Grid size={{ xs: 12, sm: 7 }}>
//           <Paper elevation={2} sx={{ p: 3 }}>
//             <Typography variant="h6" fontWeight={600} mb={3}>
//               Delivery Information
//             </Typography>

//             <RUForm
//               onSubmit={handleCheckout}
//               resolver={zodResolver(checkoutValidationSchema)}
//               defaultValues={defaultValues}
//             >
//               <Stack spacing={3}>
//                 <RUSelectField
//                   name="deliveryType"
//                   label="Delivery Type"
//                   items={['HOME', 'PICKUP'].map(type => ({
//                     label: type,
//                     value: type
//                   }))}
//                   required
//                   fullWidth
//                   size="small"
//                 />

//                 <RUInput
//                   name="contactNumber"
//                   label="Contact Number"
//                   type="tel"
//                   fullWidth
//                   placeholder="+8801700000000"
//                 />

//                 <DynamicDeliveryFields pickupPoints={pickupPoints} />

//                 <RUSelectField
//                   name="paymentMethod"
//                   label="Payment Method"
//                   items={[
//                     { label: 'Cash on Delivery', value: 'CASH_ON_DELIVERY' },
//                     { label: 'Online Payment', value: 'ONLINE_PAYMENT' }
//                   ]}
//                   required
//                   fullWidth
//                   size="small"
//                 />

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   fullWidth
//                   disabled={isSubmitting}
//                   sx={{ mt: 2 }}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <CircularProgress size={20} sx={{ mr: 1 }} />
//                       Processing...
//                     </>
//                   ) : (
//                     `Place Order - $${total.toFixed(2)}`
//                   )}
//                 </Button>
//               </Stack>
//             </RUForm>
//           </Paper>
//         </Grid>

//         <Grid size={{ xs: 12, sm: 5 }}>
//           <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
//             <Typography variant="h6" fontWeight={600} mb={3}>
//               Order Summary
//             </Typography>

//             <Stack spacing={2} mb={3}>
//               {mergedCart.map((item) => (
//                 <Box key={item.variantId}>
//                   <Stack direction="row" justifyContent="space-between" alignItems="center">
//                     <Box>
//                       <Typography variant="body2" fontWeight={500}>
//                         {item.name}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Size: {item.size} • Qty: {item.quantity}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body2" fontWeight={500}>
//                       ${((item.price || 0) * item.quantity).toFixed(2)}
//                     </Typography>
//                   </Stack>
//                 </Box>
//               ))}
//             </Stack>

//             <Divider sx={{ my: 2 }} />

//             <Stack spacing={1}>
//               <Stack direction="row" justifyContent="space-between">
//                 <Typography variant="body2">Subtotal</Typography>
//                 <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
//               </Stack>

//               <Stack direction="row" justifyContent="space-between">
//                 <Typography variant="body2">Delivery Fee</Typography>
//                 <Typography variant="body2">${deliveryFee.toFixed(2)}</Typography>
//               </Stack>

//               <Divider sx={{ my: 1 }} />

//               <Stack direction="row" justifyContent="space-between">
//                 <Typography variant="h6" fontWeight={600}>Total</Typography>
//                 <Typography variant="h6" fontWeight={600} color="primary">
//                   ${total.toFixed(2)}
//                 </Typography>
//               </Stack>
//             </Stack>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default CheckoutPage;

// ============================================
// FILE: app/checkout/page.tsx
// ============================================

// ============================================
// FILE: app/checkout/page.tsx
// ============================================

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { 
  Container, 
  Box, 
  Typography, 
  Stack, 
  Grid, 
  Button,
  Paper,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/useAuth';
import RUForm from '@/components/ReUsableForms/RUForm';
import RUInput from '@/components/ReUsableForms/RUInput';
import { useGetSelectedCartMutation } from '@/redux/api/cartApi';
import { FieldValues } from 'react-hook-form';
import RUSelectField from '@/components/ReUsableForms/RUSelectField';
import { useWatch } from 'react-hook-form';
import { useCreateOrderMutation, useInitiatePaymentMutation } from '@/redux/api/orderApi';
import { CartVariant, IOrderPayload, IPickupPoint } from '@/types';

// Validation schema
const checkoutValidationSchema = z.object({
  deliveryType: z.enum(['HOME', 'PICKUP'] as const, {
    message: "Delivery type is required",
  }),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  pickupPointId: z.string().optional(),
  contactNumber: z.string().min(10, "Valid phone number required"),
  paymentMethod: z.enum(['CASH_ON_DELIVERY', 'ONLINE_PAYMENT'] as const, {
    message: "Payment method is required",
  }),
}).refine((data) => {
  if (data.deliveryType === 'HOME') {
    return data.address && data.address.length >= 10 && 
           data.city && data.city.length >= 2 && 
           data.country && data.country.length >= 2;
  }
  return true;
}, {
  message: "Address, city, and country are required for home delivery",
  path: ['address'],
}).refine((data) => {
  if (data.deliveryType === 'PICKUP') {
    return data.pickupPointId && data.pickupPointId.length > 0;
  }
  return true;
}, {
  message: "Pickup point is required for pickup delivery",
  path: ['pickupPointId'],
});

// Calculate delivery charge based on city
const calculateDeliveryCharge = (city?: string): number => {
  if (!city) return 0;
  
  const normalized = city.toLowerCase().trim();
  const insideDhakaAreas = ["dhaka", "uttara", "mirpur", "banani", "gulshan", "dhanmondi"];
  
  if (insideDhakaAreas.includes(normalized)) {
    return 60; // Inside Dhaka
  }
  
  return 120; // Outside Dhaka
};

// Dynamic delivery fields component
const DynamicDeliveryFields = ({ pickupPoints }: { pickupPoints: IPickupPoint[] }) => {
  const deliveryType = useWatch({ name: 'deliveryType' });
  const city = useWatch({ name: 'city' });

  return (
    <>
      {deliveryType === 'HOME' && (
        <>
          <RUInput
            name="address"
            label="Delivery Address"
            fullWidth
            placeholder="123 Example Street"
          />

          <Grid container spacing={2}>
            <Grid size={{ xs:12,  md:6}}>
              <RUInput
                name="city"
                label="City"
                fullWidth
                placeholder="Dhaka"
              />
            </Grid>
            <Grid size={{ xs:12,  md:6}}>
              <RUInput
                name="country"
                label="Country"
                fullWidth
                placeholder="Bangladesh"
              />
            </Grid>
          </Grid>

          {city && (
            <Alert severity="info" sx={{ mt: 1 }}>
              Delivery charge: ৳{calculateDeliveryCharge(city)}
            </Alert>
          )}
        </>
      )}

      {deliveryType === 'PICKUP' && pickupPoints.length > 0 && (
        <>
          <RUSelectField
            name="pickupPointId"
            label="Select Pickup Point"
            items={pickupPoints.map(point => ({
              label: `${point.name} - ${point.address}`,
              value: point.id,
            }))}
            required
            fullWidth
            size="small"
          />
          <Alert severity="info" sx={{ mt: 1 }}>
            No delivery charge for pickup
          </Alert>
        </>
      )}
    </>
  );
};

const CheckoutPage = () => {
  const router = useRouter();
  const { effectiveCart, clearCart } = useCart();
  const userInfo = useAuth();
  const isLoggedIn = !!userInfo?.role;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickupPoints, setPickupPoints] = useState<IPickupPoint[]>([]);

  const cartItemIds = useMemo(() => effectiveCart.map((item) => item.variantId), [effectiveCart]);
  const [getSelectedCart, { data: cartData, isLoading }] = useGetSelectedCartMutation();
  const [createOrder] = useCreateOrderMutation();
  const [initiatePayment] = useInitiatePaymentMutation();

  // Fetch pickup points
  useEffect(() => {
    const fetchPickupPoints = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/distribution-point`);
        const data = await response.json();
        setPickupPoints(data.data || []);
      } catch (error) {
        console.error('Failed to fetch pickup points:', error);
        toast.error('Failed to load pickup points');
      }
    };
    fetchPickupPoints();
  }, []);

  // Fetch cart data
  useEffect(() => {
    if (cartItemIds.length === 0) return;
    getSelectedCart({ ids: cartItemIds })
      .unwrap()
      .catch((error) => {
        console.error('Failed to fetch cart:', error);
        toast.error('Failed to load cart items');
      });
  }, [getSelectedCart, cartItemIds]);

  // Merge cart with product data
  const mergedCart = useMemo(() => {
    return effectiveCart.map((item) => {
      const variant = cartData?.find(
        (v: CartVariant) => v.id === item.variantId
      );
      return {
        ...item,
        price: variant?.price ?? 0,
        name: variant?.productName ?? "",
        image: variant?.image ?? null,
        size: variant?.size ?? "S",
        variantQuantity: variant?.variantQuantity ?? 0
      };
    });
  }, [effectiveCart, cartData]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      toast.info('Please login to continue');
      router.push('/login?redirect=checkout');
    }
  }, [isLoggedIn, router]);

  // Redirect if cart is empty
  useEffect(() => {
    if (isLoggedIn && effectiveCart.length === 0) {
      toast.error("Your cart is empty");
      router.push('/');
    }
  }, [effectiveCart, isLoggedIn, router]);

  // Calculate totals
  const subtotal = mergedCart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity, 
    0
  );

  // Handle checkout submission
  const handleCheckout = async (data: FieldValues) => {
    setIsSubmitting(true);
    
    try {
      // Calculate delivery fee based on selected city or pickup
      // const deliveryFee = data.deliveryType === 'HOME' 
      //   ? calculateDeliveryCharge(data.city)
      //   : 0;
      
      // const total = subtotal + deliveryFee;

      const orderPayload: IOrderPayload = {
        contactNumber: data.contactNumber,
        deliveryType: data.deliveryType,
        paymentMethod: data.paymentMethod,
        ...(data.deliveryType === "HOME"
          ? {
              address: data.address,
              city: data.city,
              country: data.country,
            }
          : {
              pickupPointId: data.pickupPointId,
            }),
      };

      if (data.paymentMethod === 'CASH_ON_DELIVERY') {
        // COD: Create order directly
        const response = await createOrder(orderPayload).unwrap();
        
        if (response?.orderId) {
          toast.success("Order placed successfully!");
          clearCart();
          router.push(`/order-confirmation/${response.orderId}`);
        } else {
          toast.error(response?.message || "Failed to place order");
        }
      } else {
        // ONLINE_PAYMENT: Initiate payment first
        const paymentResponse = await initiatePayment(orderPayload).unwrap();
        
        if (paymentResponse?.paymentUrl) {
          toast.info("Redirecting to payment gateway...");
          // Redirect to payment gateway
          window.location.href = paymentResponse.paymentUrl;
        } else {
          toast.error("Failed to initiate payment");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      // const errorMessage = error?.data?.message || 
      //   error?.message || 
        // "An error occurred during checkout";
      toast.error("An error occurred during checkout");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn || isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const defaultValues = {
    deliveryType: 'HOME' as const,
    address: '',
    city: '',
    country: 'Bangladesh',
    pickupPointId: '',
    contactNumber: '',
    paymentMethod: 'CASH_ON_DELIVERY' as const,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} mb={4}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Left side - Form */}
        <Grid size={{xs:12, md:7}}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={3}>
              Delivery Information
            </Typography>

            <RUForm
              onSubmit={handleCheckout}
              resolver={zodResolver(checkoutValidationSchema)}
              defaultValues={defaultValues}
            >
              <Stack spacing={3}>
                <RUSelectField
                  name="deliveryType"
                  label="Delivery Type"
                  items={[
                    { label: 'Home Delivery', value: 'HOME' },
                    { label: 'Pickup from Store', value: 'PICKUP' }
                  ]}
                  required
                  fullWidth
                  size="small"
                />

                <RUInput
                  name="contactNumber"
                  label="Contact Number"
                  type="tel"
                  fullWidth
                  placeholder="+8801700000000"
                />

                <DynamicDeliveryFields pickupPoints={pickupPoints} />

                <RUSelectField
                  name="paymentMethod"
                  label="Payment Method"
                  items={[
                    { label: 'Cash on Delivery', value: 'CASH_ON_DELIVERY' },
                    { label: 'Online Payment (SSL Commerz)', value: 'ONLINE_PAYMENT' }
                  ]}
                  required
                  fullWidth
                  size="small"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </Stack>
            </RUForm>
          </Paper>
        </Grid>

        {/* Right side - Order Summary */}
        <Grid size={{ xs:12,  md:5}}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" fontWeight={600} mb={3}>
              Order Summary
            </Typography>

            <Stack spacing={2} mb={3}>
              {mergedCart.map((item) => (
                <Box key={item.variantId}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Size: {item.size} • Qty: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={500}>
                      ৳{((item.price || 0) * item.quantity).toFixed(2)}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Subtotal</Typography>
                <Typography variant="body2">৳{subtotal.toFixed(2)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Delivery Fee</Typography>
                <Typography variant="body2" color="text.secondary">
                  Will be calculated
                </Typography>
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" fontWeight={600}>Subtotal</Typography>
                <Typography variant="h6" fontWeight={600} color="primary">
                  ৳{subtotal.toFixed(2)}
                </Typography>
              </Stack>
            </Stack>

            <Alert severity="info" sx={{ mt: 2 }}>
              Final amount will be shown before payment
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;