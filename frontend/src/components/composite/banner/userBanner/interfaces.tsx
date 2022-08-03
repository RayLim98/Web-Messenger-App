export type Selection  =  'Profile Photo' | 'Upload Photo' | 'Edit Photo'

export interface PhotoProps {
    original: any
    cropped: string | null | undefined
}

export interface UserModalProps {
    onClose: (image:any) => void
    open: boolean
    currentImage: PhotoProps
}
