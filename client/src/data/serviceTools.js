import { Article, FindReplace, Home, LocalShipping, LockOpen, ManageAccounts, Payment, RemoveShoppingCart } from '@mui/icons-material'

export const serviceTools = [
    {
        id: 1,
        label: "Track Order",
        icon: LocalShipping
    },
    {
        id: 2,
        label: "Reset Password",
        icon: LockOpen
    },
    {
        id: 3,
        label: "My Payment Options",
        icon: Payment
    },
    {
        id: 4,
        label: "Vouchers",
        icon: Article,
    },
    {
        id: 5,
        label: "Edit Account Details",
        icon: ManageAccounts
    },
    {
        id: 6,
        label: "My Cancellation",
        icon: RemoveShoppingCart
    },
    {
        id: 7,
        label: "My Returns",
        icon: FindReplace
    },
    { 
        id: 8,
        label: "Address Book",
        icon: Home
    }
]