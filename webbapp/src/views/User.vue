<template>
    <div class="user-container">
        <Authority v-if="$route.params.option == 'authority'" class="sign-container"> </Authority>
        <SignIn v-if="$route.params.option == 'login'" class="sign-container"> </SignIn>
        <SignUp v-if="$route.params.option == 'register'" class="sign-container"> </SignUp>
    </div>
</template>
<script>
import Authority from '../components/auth/Authority'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
export default {
    name:'User',
    components:{
        Authority,
        SignIn,
        SignUp
    },
    props: {
      source: String,
    },
}
</script>
<style scoped>
    .user-container{
        text-align: center;
    }
    .sign-container{
        padding: 20px;
        margin: 0 auto;
    }

</style>