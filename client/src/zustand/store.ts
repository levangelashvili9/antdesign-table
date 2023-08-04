import { create } from "zustand";
import { PersonType, UserFormType } from "src/types";
import axios, { AxiosResponse } from "axios";

type StoreState = {
  data: PersonType[];
  fetchData: () => void;
  addUser: (req: UserFormType) => void;
  deleteUser: (id: number | string) => void;
  editUser: (id: number | string, req: UserFormType) => void;
};

export const useStore = create<StoreState>((set) => ({
  data: [],
  fetchData: async () => {
    try {
      const response: AxiosResponse<PersonType[]> = await axios.get(
        "http://localhost:5000/data"
      );
      set({ data: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  addUser: async (req: UserFormType) => {
    const newUser = {
      id: crypto.randomUUID(),
      name: req.name,
      email: req.email,
      gender: req.gender,
      address: {
        street: req.street,
        city: req.city,
      },
      phone: req.phone,
    };
    try {
      const response = await axios.post("http://localhost:5000/add", newUser);
      set((state) => ({
        data: [...state.data, response.data],
      }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteUser: (id: number | string) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then(() => {
      set((state: StoreState) => ({
        data: state.data.filter((item: PersonType) => item.id != id),
      }));
    });
  },
  editUser: async (id: number | string, req: UserFormType) => {
    const newUser = {
      id: id,
      name: req.name,
      email: req.email,
      gender: req.gender,
      address: {
        street: req.street,
        city: req.city,
      },
      phone: req.phone,
    };
    try {
      await axios.put(`http://localhost:5000/update/${id}`, newUser);
      set((state: StoreState) => ({
        data: state.data.map((item: PersonType) =>
          item.id == id ? newUser : item
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
