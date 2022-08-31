export default function (context) {
    // console.log('check auth', context)
    context.store.dispatch('authentication/initAuth', context.req)
}