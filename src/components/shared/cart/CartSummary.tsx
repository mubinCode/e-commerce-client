import { useAuth } from "@/context/useAuth"
import { useRouter } from "next/navigation"

interface Props {
  cart: {
    variantId: string
    price: number
    quantity: number
  }[]
}

const CartSummary = ({ cart }: Props) => {

  const router = useRouter();
  const userInfo = useAuth();
  const isLoggedIn = !!userInfo?.role;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 60
  const total = subtotal + deliveryFee

  const handleCheckout = () => {
    if (!isLoggedIn) {
      // Store current path to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      router.push('/login?redirect=checkout');
      return;
    }
    
    // User is logged in, proceed to checkout
    router.push('/checkout');
  };

  return (
    <div className="pt-6 border p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Delivery Fee</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>

      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        onClick={handleCheckout}
        disabled={cart.length === 0}
      >
        {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
      </button>
      
      {!isLoggedIn && (
        <p className="text-sm text-gray-500 text-center mt-2">
          You will be redirected to login
        </p>
      )}
    </div>
  );
}

export default CartSummary
