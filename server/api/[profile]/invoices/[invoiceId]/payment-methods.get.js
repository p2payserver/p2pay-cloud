export default defineEventHandler(async (event) => {
  
  const profile = ent.context.params.profile;
  const invoiceId = event.context.params.invoiceId;
  return await greenfieldApi(profile, `/invoices/${invoiceId}/payment-methods`, event);
});
