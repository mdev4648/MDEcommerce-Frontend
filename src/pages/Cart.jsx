import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery, useGetCheckoutSummaryQuery,useUpdateCartItemMutation,useRemoveCartItemMutation, } from "../features/cart/cartApi";
import { ImSpinner2 } from "react-icons/im";
import { ChevronLeft } from "lucide-react";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const navigate = useNavigate();

  const { data: cart, isLoading } = useGetCartQuery();
  const { data: summary, isLoading: summaryLoading } = useGetCheckoutSummaryQuery();
  const [updateCartItem, { isLoading: updating }] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();


const handleUpdateQuantity = async (id, quantity) => {
  if (quantity < 1) return;

  try {
    await updateCartItem({ id, quantity }).unwrap();
  } catch (err) {
    console.error("Update failed", err);
  }
};

const handleRemoveItem = async (id) => {
  try {
    await removeCartItem(id).unwrap();
  } catch (err) {
    console.error("Remove failed", err);
  }
};


  console.log("CART ITEMS", cart)

  if (isLoading || summaryLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner2 className="animate-spin text-3xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-6 text-sm font-semibold hover:opacity-70"
        >
          <ChevronLeft size={18} />
          Back to Shop
        </button>

        <div className="grid lg:grid-cols-12 gap-10">

          {/* CART ITEMS */}
          <div className="lg:col-span-8">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                CARTS {cart?.items?.length || 0}
              </h2>

              <button className="text-red-500 text-sm font-semibold">
                DELETE ALL
              </button>
            </div>

            {/* Items */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">

              {cart?.items?.map((item) => {
                const attributes = item.variant?.attributes || [];

                const color = attributes.find((a) =>
                  a.toLowerCase().includes("color")
                );
                const size = attributes.find((a) =>
                  a.toLowerCase().includes("size")
                );

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-5 border-b border-border"
                  >
                    {/* Product */}
                    <div className="flex items-center gap-4">

                      {/* Image placeholder (later we connect product images API) */}
                      <div className="w-20 h-20 bg-muted rounded-xl" />

                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.product_name}
                        </h3>

                        {color && (
                          <p className="text-sm text-muted-foreground">
                            {color}
                          </p>
                        )}

                        {size && (
                          <p className="text-sm text-muted-foreground">
                            {size}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6">

                        <p className="font-semibold text-lg">
                          Birr {item.total_price.toLocaleString()}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            -
                          </button>

                          <span className="px-4">{item.quantity}</span>

                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:scale-110 transition"
                        >
                          <Trash2 size={20} />
                        </button>

                      </div>


                  </div>
                );
              })}

            </div>
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-4 md:mt-14">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">

              <h3 className="text-xl font-bold">SUMMARY</h3>

              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{summary?.items?.length || 0}</span>
              </div>

              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>Birr {summary?.cart_total?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes</span>
                <span>+0</span>
              </div>

              <hr className="border-border" />

              <div className="flex justify-between font-bold text-lg">
                <span>Final Payment</span>
                <span>Birr {summary?.cart_total?.toLocaleString()}</span>
              </div>

              {/* Promo */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 border border-border rounded-xl px-3 py-2 bg-background"
                />
                <button className="bg-primary text-white px-4 rounded-xl">
                  APPLY
                </button>
              </div>

              {/* Payment Methods */}
                <div className="space-y-2 pt-2">
                <p className="text-sm font-semibold opacity-70">
                    Available Payment Methods
                </p>

                <div className="flex gap-2 flex-wrap">
                    {summary?.available_payment_methods?.map((method) => (
                    <span
                        key={method}
                        className="px-3 py-1 rounded-lg border border-border bg-muted text-sm"
                    >
                        {method}
                    </span>
                    ))}
                </div>
                </div>
              {/* Checkout */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:brightness-110 transition"
              >
                CHECKOUT
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}