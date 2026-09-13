import { create } from 'zustand'

export const useZustand = create((set) => ({
    dataZ: [
        {
            id: 1,
            name: "Soleh",
            age: 22,
        },
        {
            id: 2,
            name: "Anush",
            age: 18,
        },
        {
            id: 3,
            name: "Sobir",
            age: 31,
        },
        {
            id: 4,
            name: "Amina",
            age: 28,
        },
        {
            id: 5,
            name: "Binomin",
            age: 21,
        },
    ],
    deleteUserZ: (id) => set((state) => ({ dataZ: state.dataZ.filter(el => el.id != id) })),
    addUserZ: (user) => set((state) => ({ dataZ: [user, ...state.dataZ] })),
    editUserZ: (user) => set((state) => ({ dataZ: state.dataZ.map(el => el.id === user.id ? user : el) }))
}))