<script setup>
const { signIn } = useAuth()

const {
  public: {
    deploymentDomain
  }
} = useRuntimeConfig();

await signIn(undefined, { callbackUrl: `${deploymentDomain}/dashboard` })
</script>
