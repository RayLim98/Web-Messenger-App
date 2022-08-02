export interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    type?: "button" | "reset" | "submit"
}
