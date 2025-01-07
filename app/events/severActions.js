"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bycrpt from "bcrypt";
export async function registerUser({ email, password }) {
  try {
    await connectDB();
    const prevUser = await User.findOne({ email: email }).select("email");
    console.log("prevUser", prevUser);
    const hashedPassword = await bycrpt.hash(password, 10);
    if (prevUser) return { error: "User already exists" };
    const res = User.create({
      email: email,
      password: hashedPassword,
    });
    if (!res) return { error: "Error creating user" };
    return { success: "User created successfully" };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getAllPublications() {
  try {
    const backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:8000";
    const res = await fetch(`${backendUrl}/book/all`);
    console.log("res", res.json);
    if (!res.ok) {
      throw new Error("Error fetching publications");
    }
    return res.json();
  } catch (error) {
    console.log("error", error);
    return { error: error.message };
  }
}
export async function getAllBorrowedPublications() {
  try {
    const backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:8000";
    const res = await fetch(`${backendUrl}/book/borrowed`);
    console.log("res", res.json);
    if (!res.ok) {
      throw new Error("Error fetching publications");
    }
    return res.json();
  } catch (error) {
    console.log("error", error);
    return { error: error.message };
  }
}
export async function updatePublicationsService(id, publication) {
  try {
    const backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:8000";
    const res = await fetch(`${backendUrl}/book/${id}`, {
      method: "PUT",
      body: JSON.stringify(publication),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res", "here");
    if (!res.ok) {
      throw new Error("Error updating publication");
    }
    return res.json();
  } catch (error) {
    console.log("error", error);
    throw new Error("Error updating publication");
  }
}

export async function addPublicationsService(publication) {
  try {
    console.log("publication", publication);
    const backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:8000";
    const data = await fetch(`${backendUrl}/book/create`, {
      method: "POST",
      body: JSON.stringify(publication),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newPub = await data.json();
    console.log("newPub", newPub);
    if (!data.ok) {
      throw new Error("Error adding publication");
    }
    return newPub;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error adding publication");
  }
}

export async function deletePublicationsService(id) {
  try {
    const backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:8000";
    const data = await fetch(`${backendUrl}/book/${id}`, {
      method: "DELETE",
    });
    console.log("data", data);
    if (!data.ok) {
      throw new Error("Error deleting publication");
    }
    return data.json();
  } catch (error) {
    console.log("error", error);
    throw new Error("Error deleting publication");
  }
}

export async function newTransaction(userId, bookId) {
  try {
    const backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:8000";
    const data = await fetch(`${backendUrl}/transaction/create`, {
      method: "POST",
      body: JSON.stringify({ userId, bookId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("data", data);
    if (!data.ok) {
      throw new Error("Error creating transaction");
    }
    return data.json();
  } catch (error) {
    console.log("error", error);
    throw new Error("Error creating transaction");
  }
}

export async function completeTransaction(userId, bookId) {
  console.log("bookId", bookId, userId);
  try {
    const backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:8000";
    const data = await fetch(`${backendUrl}/transaction/complete`, {
      method: "POST",
      body: JSON.stringify({ userId, bookId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responeData = await data.json();
    console.log("responeData", responeData);
    if (!data.ok) {
      throw new Error("Error returning book");
    }
    return responeData;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error returning book");
  }
}

export async function getAllTransactions() {
  try {
    const backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:8000";
    const data = await fetch(`${backendUrl}/transaction/all`);

    if (!data.ok) {
      throw new Error("Error fetching transactions");
    }
    return data.json();
  } catch (error) {
    console.log("error", error);
    throw new Error("Error fetching transactions");
  }
}

export async function dashboardRecentRegistedUserPerMonth() {
  try {
    const backendUrl = process.env.BACKEND_URL
      ? process.env.BACKEND_URL
      : "http://localhost:8000";
    const data = await fetch(`${backendUrl}/user/count/registered`);
    if (!data.ok) {
      throw new Error("Error fetching transactions");
    }
    return data.json();
  } catch (error) {
    console.log("error", error);
    throw new Error("Error fetching transactions");
  }
}
