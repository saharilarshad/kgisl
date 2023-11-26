import { create } from "zustand"
import { persist } from "zustand/middleware"
import { produce } from 'immer';
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from 'uuid'


type EmployeeData = {
    id: string
    profileImage?: string,
    name: string,
    salary: number,
    age: number
}

type StoreState = {
    employee: EmployeeData[]
}

export const createEmployeeStore = (initialLocale: string) => {
    return create<StoreState>(
        persist((set) => ({
            employee: [],
            currentLocale: initialLocale,
            // employee: [
            //     {
            //         profileImage: "",
            //         name: "",
            //         salary: 0,
            //         age: 0
            //     }
            // ],
            addEmployee: async (newEmployee: HTMLFormElement, currentLocale: string) => {

                const id = uuidv4()
                const file: File | null = newEmployee.get('image') as unknown as File
                const profileImage = file.size + file.lastModified + file.name
                const name = newEmployee.get("name")
                const salary = newEmployee.get("salary")
                const age = newEmployee.get("age")

                const newEmp: EmployeeData = {
                    id,
                    profileImage: profileImage as string,
                    name: name as string,
                    salary: salary ? Number(salary) : 0,
                    age: age ? Number(age) : 0
                }

                console.log(currentLocale)

                async function saveFile() {

                    const formData = new FormData();
                    formData.append("image", file);
                    formData.append("profileImage", profileImage);

                    try {
                        const apiUrl = `/api/saveImage`;
                        // const apiUrl = `/${currentLocale}/api/saveImage`;
                        console.log("API URL:", apiUrl);

                        const response = await fetch(apiUrl, {
                            method: "POST",
                            body: formData,
                        });

                        console.log('response', response);

                        if (!response.ok) {
                            console.error("Error uploading file");
                        }
                    } catch (error) {
                        console.error(`Error uploading file: ${error.message}`);
                    }
                }

                await saveFile();

                console.log("success")

                // state.employee.push(newEmp);
                set((state: StoreState) => {

                    console.log(state.employee)
                    console.log(newEmp)
                    return { employee: [...state.employee, newEmp] }
                })
            },
            updateEmployee: async (uptEmployee: HTMLFormElement) => {
                // console.log(uptEmployee.formData())
                console.log("masukup")
                const getId = uptEmployee.get("id")
                console.log(getId)
                const file: File | null = uptEmployee.get('image') as unknown as File

                const currProfileImage = file ? file.size + file.lastModified + file.name : null
                console.log(currProfileImage)
                const name = uptEmployee.get("name")
                console.log(name)
                const salary = uptEmployee.get("salary")
                const age = uptEmployee.get("age")

                set((state: StoreState) => {
                    const existingEmployee = state.employee.find(emp => emp.id === getId)
                    console.log(existingEmployee)

                    if (existingEmployee) {

                        if (file) {
                            console.log("masuksini")
                            const updateEmp = {
                                ...existingEmployee,
                                profileImage: currProfileImage as string,
                                name: name as string,
                                salary: salary ? Number(salary) : 0,
                                age: age ? Number(age) : 0
                            }


                            saveFile(file, currProfileImage, state.currentLocale).then(() => {
                                const updateEmployeeList = state?.employee.map(emp => emp.id === getId ? updateEmp : emp)
                                set((state: StoreState) => ({
                                    // employee: state?.employee.map(emp => (emp.id === getId ? updateEmp : emp))
                                    // employee: [...state.employee, updateEmployeeList]
                                    employee: updateEmployeeList

                                }))
                            })

                        } else {
                            console.log('xde file')
                            const updateEmp = {
                                ...existingEmployee,
                                // profileImage: existingEmployee.profileImage as string,
                                name: name as string,
                                salary: salary ? Number(salary) : 0,
                                age: age ? Number(age) : 0
                            }

                            const updateEmployeeList = state?.employee.map(emp => emp.id === getId ? updateEmp : emp)
                            set((state: StoreState) => ({
                                // employee : state?.employee.map(emp => (emp.id === getId ? updateEmp : emp))
                                employee: [...state.employee, updateEmployeeList]
                            }))
                            // console.log(updateEmployeeList)
                            // return { employee: updateEmployeeList }
                        }
                    } else {
                        console.log("Employee not found");
                        // return state;
                    }

                })
            },
            removeEmployee: (employeeId: string) => set((state: StoreState) => {
                const updateRemove = state.employee.filter(emp => emp.id !== employeeId)

                return { employee: updateRemove }
            })

        }), {
            name: 'persist-employee',
            getStorage: () => localStorage
        })
    )
}

export const employeeStore = createEmployeeStore('en');

async function saveFile(file, currProfileImage, currentLocale) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("profileImage", currProfileImage);

    try {
        // const response = await fetch(`/${currentLocale}/api/saveImage`, {
        const response = await fetch(`/api/saveImage`, {
            method: "POST",
            body: formData,
        });

        console.log('response', response);

        if (!response.ok) {
            console.error("Error uploading file");
        }
    } catch (error) {
        console.error(`Error uploading file: ${error.message}`);
    }
}