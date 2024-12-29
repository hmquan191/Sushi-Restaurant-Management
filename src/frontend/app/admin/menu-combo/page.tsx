'use client';

import React, { useEffect, useState } from "react";
import { AdminHeader } from "@/components/Admin/admin-header"
import { SideNav } from "@/components/Admin/side-nav"

const MenuPage = () => {
  //--------------Menu Item Management----------------
  interface MenuItem {
    item_name: string,
    description: string,
    base_price: number,
    status: string,
    category_id: string,
    image_url: string,
  }

  const [menuItem, setMenuItem] = useState<MenuItem[]>([]);
  const [newMenuItem, setNewMenuItem] = useState({
    item_name: "",
    description: "",
    base_price: "",
    status: "available",
    category_id: "",
    image_url: "NULL",
  });
  const [message, setMessage] = useState("");
  const [itemDelete, setItemDelete] = useState<string | null>(null);

  // Add a new menu item
  const addMenuItem = async () => {
    try {
      const response = await fetch("http://localhost:8000/company/menu-item/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMenuItem),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Menu Item added successfully!");
        //fetchMenuList(); // Refresh menu list
      } else {
        setMessage(data.message || "Error adding menu item.");
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  // Deleting menu item
  const deleteMenuItem = async () => {
    if (!itemDelete) return;
    try {
      const response = await fetch("http://localhost:8000/company/menu-item/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ combo_id: comboDelete }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Menu Item deleted successfully!");
        //fetchMenuList(); // Refresh menu list
        setItemDelete(itemDelete);
      } else {
        setMessage(data.message || "Error deleting menu item.");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  //--------------Combo Management----------------
  interface Combo {
    combo_name: string,
    combo_description: string,
    item_ids: string[],
  }
  const [combo, setCombo] = useState<Combo[]>([]);
  const [newCombo, setNewCombo] = useState({
    combo_name: "",
    combo_description: "",
    item_ids: ["", "", ""],
  });
  const [comboDelete, setComboDelete] = useState<string | null>(null);

  // Add a new combo
  const addCombo = async () => {
    try {
      const response = await fetch("http://localhost:8000/company/combo/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCombo),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Combo added successfully!");
      } else {
        setMessage(data.message || "Error adding combo.");
      }
    } catch (error) {
      console.error("Error adding combo:", error);
    }
  };

  // Deleting combo
  const deleteCombo = async () => {
    if (!comboDelete) return;
    try {
      const response = await fetch("http://localhost:8000/company/combo/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ combo_id: comboDelete }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Combo deleted successfully!");
        setComboDelete(null);
      } else {
        setMessage(data.message || "Error deleting combo.");
      }
    } catch (error) {
      console.error("Error deleting combo:", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <SideNav />
      <div className="ml-60 p-6">
        <h1 className="font-bold text-4xl mb-6">Menu Management</h1>
        {/* Add New Menu Item Form */}
        <div className="border p-4 rounded-lg bg-gray-100 mb-6">
          <h2 className="font-bold text-xl mb-4">Add New Menu Item</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNewMenuItem({ ...newMenuItem, status: 'available' });
              addMenuItem();
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
              type="text"
              placeholder="Menu Category Id"
              value={newMenuItem.category_id}
              onChange={(e) =>
              setNewMenuItem({ ...newMenuItem, category_id: e.target.value })
              }
              className="p-2 border rounded"
              required
              />
              <input
              type="text"
              placeholder="Item Name"
              value={newMenuItem.item_name}
              onChange={(e) =>
              setNewMenuItem({ ...newMenuItem, item_name: e.target.value })
              }
              className="p-2 border rounded"
              required
              />
              <input
              type="text"
              placeholder="Base Price"
              value={newMenuItem.base_price}
              onChange={(e) =>
              setNewMenuItem({ ...newMenuItem, base_price: e.target.value })
              }
              className="p-2 border rounded"
              required
              />
              <textarea
              placeholder="Item Description"
              value={newMenuItem.description}
              onChange={(e) =>
              setNewMenuItem({ ...newMenuItem, description: e.target.value })
              }
              className="p-2 border rounded col-span-2 max-h-[120px] min-h-[120px]"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Menu Item
            </button>
          </form>
        </div>
        {message && <p className="mt-4 text-green-500">{message}</p>}
        {/* Delete Menu Item Section */}
        <div className="border p-4 rounded-lg bg-red-100 mb-6 hover:bg-red-300">
          <h2 className="font-bold text-xl mb-4">Delete Menu Item</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              deleteMenuItem();
            }}
          >
            <div className="grid grid-cols-1 gap-4">
              <input
          type="string"
          placeholder="Menu Item ID"
          value={itemDelete || ""}
          onChange={(e) => setItemDelete(String(e.target.value))}
          className="p-2 border rounded"
          required
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete Menu Item
            </button>
          </form>
        </div>



          <div className="border p-4 rounded-lg bg-gray-100 mb-6">
            <h2 className="font-bold text-xl mb-4">Add New Combo</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addCombo();
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
            type="text"
            placeholder="Combo Name"
            value={newCombo.combo_name}
            onChange={(e) =>
              setNewCombo({ ...newCombo, combo_name: e.target.value })
            }
            className="p-2 border rounded col-span-2"
            required
                />
                <textarea
            placeholder="Combo Description"
            value={newCombo.combo_description}
            onChange={(e) =>
              setNewCombo({ ...newCombo, combo_description: e.target.value })
            }
            className="p-2 border rounded col-span-2 max-h-[120px] min-h-[120px]"
                />
                <input
            type="text"
            placeholder="Item ID 1"
            value={newCombo.item_ids[0] || ""}
            onChange={(e) =>
              setNewCombo({
                ...newCombo,
                item_ids: [e.target.value, newCombo.item_ids[1], newCombo.item_ids[2]],
              })
            }
            className="p-2 border rounded col-span-2"
            required
                />
                <input
            type="text"
            placeholder="Item ID 2"
            value={newCombo.item_ids[1] || ""}
            onChange={(e) =>
              setNewCombo({
                ...newCombo,
                item_ids: [newCombo.item_ids[0], e.target.value, newCombo.item_ids[2]],
              })
            }
            className="p-2 border rounded col-span-2"
                />
                <input
            type="text"
            placeholder="Item ID 3"
            value={newCombo.item_ids[2] || ""}
            onChange={(e) =>
              setNewCombo({
                ...newCombo,
                item_ids: [newCombo.item_ids[0], newCombo.item_ids[1], e.target.value],
              })
            }
            className="p-2 border rounded col-span-2"
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Combo
              </button>
            </form>
          </div>

        {/* Delete Combo*/}
        <div className="border p-4 rounded-lg bg-red-100 mb-6 hover:bg-red-300">
          <h2 className="font-bold text-xl mb-4">Delete Combo</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              deleteCombo();
              
            }}
          >
            <div className="grid grid-cols-1 gap-4">
              <input
                type="string"
                placeholder="Combo ID"
                value={comboDelete || ""}
                onChange={(e) => setComboDelete(String(e.target.value))}
                className="p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete Combo
            </button>
          </form>
        </div>

      </div>
    </>
  );
};

export default MenuPage;