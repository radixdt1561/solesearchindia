export default (context) => {
    let user = context.store.getters["authentication/getUser"]
    // console.log("inside auth middleware printing user", user)
    if (!context.store.getters["authentication/isAuthenticated"]) {
        // console.log('print just auth user not authenticated')
        return context.redirect('/login')
    }
    // console.log('Seeing the value of context inside auth js middleware', context)
}