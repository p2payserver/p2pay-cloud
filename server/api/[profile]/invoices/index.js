export default defineEventHandler(async (event) => {

  const profile = ent.context.params.profile;
  return await greenfieldApi(profile, `/invoices`, event);
});
