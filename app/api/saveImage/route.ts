import { join } from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server"

export const config = {
    api: {
        bodyParser: false,
    }
}

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        console.log("masuk")

        // const {
        //     query: { locale },
        //     method,
        // } = request;

        if (request.method !== 'POST') {
            console.log("1")
            // response.statusCode = 405
            return NextResponse.end()
        }

        const imageData = await request.formData()

        const file: File | null = imageData.get('image') as unknown as File

        // const file = request.files.image

        if (!file) {
            console.log("2")
            // response.statusCode = 400
            return NextResponse.json({ error: "No file provided" })
        }

        const profileImage = imageData.get("profileImage")

        console.log("3")
        const bytes = await file.arrayBuffer()
        console.log("success1")

        const buffer = Buffer.from(bytes)
        console.log("success2")

        const imageName = profileImage
        console.log("success3")

        const paths = join(process.cwd(), 'public/uploads', imageName)
        console.log("success4")


        await writeFile(paths, buffer)
        console.log("4")

        // response.statusCode = 201
        return NextResponse.json({ success: true })
    } catch (error) {
        console.log("5")
        console.error(error)
        // response.statusCode = 500
        return NextResponse.json({ error: error.message })
    }

}