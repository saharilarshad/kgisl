'use client'

import { useState, useEffect } from "react";
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner'
import { employeeStore } from "@/store/store"
import { useRouter } from "next/navigation"
import { ErrorMessage } from "@hookform/error-message"

type Props = {
    params: string
}

interface EmployeeData {
    id: string,
    profileImage: string,
    name: string,
    salary: number,
    age: number
}

const UpdatePage = ({ params }: Props) => {
    // console.log('params', params)
    const router = useRouter()

    const { register, handleSubmit, getValues, watch, reset, formState: { errors } } = useForm<HTMLFormElement>({
        name: "", salary: 0, age: 0,
    });
    const [file, setFile] = useState<File>(null)
    const [employee, setEmployee] = useState<EmployeeData>(null)

    const updateEmploy = employeeStore((state: any) => state?.updateEmployee)


    const employees = employeeStore.getState()
    // console.log('employees', employees)
    const findEmployee = employees?.employee?.find(emp => emp.id === params.id)

    // console.log('findEmployee', findEmployee)

    useEffect(() => {
        if (findEmployee) {
            setEmployee(findEmployee)
        }
    }, [findEmployee])

    const onSubmit = async(data: HTMLFormElement, e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("id", params.id);

        if (file) {
            formData.append("image", file);
        }
        formData.append("name", data.name)
        formData.append("salary", data.salary);
        formData.append("age", data.age);

        console.log(formData.get('id'));
        console.log(formData.get('image'));
        console.log(formData.get('name'));
        console.log(formData.get('salary'));
        console.log(formData.get('age'));

        await updateEmploy(formData)

        toast.success("Employee has been Update!");

        router.push("/view")


    };

    console.log(employee)

    return (
        <>
            <Toaster position="top-center" richColors />
            <div className="p-5 flex flex-wrap h-full w-screen">
                <div className='flex items-center justify-center mx-auto'>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex flex-col gap-4 w-[27rem]">

                        <div className="flex flex-col gap-1 ">
                            <label className="font-semibold flex items-center justify-center" htmlFor="">Profile Image</label>
                            <div className="flex h-[10rem] w-[10rem] rounded-full border-2 border-dashed border-white items-center justify-center mx-auto"
                                style={{
                                    backgroundImage: file !== null ? `url(${URL.createObjectURL(file)})`
                                        : (employee?.profileImage && `url(/uploads/${employee?.profileImage})`), backgroundSize: 'cover', backgroundRepeat: 'no-repeat', zIndex: 10
                                }}
                            >
                                <div className="h-[5rem] w-[5rem] mx-auto cursor-pointer"
                                    style={{ backgroundImage: `url(${employee?.profileImage || '/upload.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', opacity: file ? 0 : 1, zIndex: 1 }}
                                >
                                    <input
                                        {...register("image")}
                                        type="file"
                                        id="picture"
                                        accept='image/*'
                                        // hidden
                                        className="h-full w-full inset-0 opacity-0 cursor-pointer text-black"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setFile(e.target.files?.[0])
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-semibold" htmlFor="">Name</label>
                            <input className='border-2 border-gray-300 focus:ring rounded-md p-1 text-black'
                                {...register("name", { required: true, maxLength: 50, minLength:3 })}
                                defaultValue={employee?.name}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-semibold" htmlFor="">Salary RM</label>
                            <input className='border-2 border-gray-300 focus:ring rounded-md p-1 text-black'
                                type="number" {...register("salary", {
                                    required: true, maxLength: 7,
                                    // pattern: {
                                    //     value: /^[1-9]\d*$/,
                                    //     message: "Please enter a valid positive integer"
                                    // },
                                    validate: {
                                        isPositiveInteger: value => (
                                            Number.isInteger(Number(value)) &&
                                            Number(value) > 0
                                        ) || "Only allow positive number without decimal",
                                        // isNotNegative: value => (
                                        //     Number(value) >= 0
                                        // ) || "Please enter a positive number",
                                        // isOdd: value => (
                                        //     Number(value) % 2 !== 0
                                        // ) || "Please enter an odd number"
                                    }
                                })}
                                defaultValue={employee?.salary}
                            />
                            {/* <ErrorMessage errors={errors} name="salary" /> */}
                            <ErrorMessage
                                errors={errors}
                                name="salary"
                                render={({ message }) => <p className="text-red-500">{message}</p>}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold" htmlFor="">Age</label>
                            <input className='border-2 border-gray-300 focus:ring rounded-md p-1 text-black'
                                type="number" {...register("age", { required: true, maxLength: 2 })}
                                defaultValue={employee?.age}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="age"
                                render={({ message }) => <p className="text-red-500">{message}</p>}
                            />
                        </div>

                        <button type="submit" className="text-white p-2 justify-center mt-3 bg-black p-1 rounded-md cursor-pointer text-center border-2 border-white" onClick={() => console.log("clicked")}>Update Employee</button>

                    </form >
                </div >
            </div >
        </>
    )
}

export default UpdatePage