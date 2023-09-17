import { ofetch } from 'ofetch';
import find from 'lodash.find';

export default eventHandler(async event => {

  const profile = event.context.params.profile;
  const invoiceId = event.context.params.invoiceId;

  const invoice = await ofetch(`/api/invoices/${invoiceId}`);
  const { 
    metadata: { 
      buyerLanguage,
      buyerEmail,
      buyerGateway: {
        buyerService,
        gatewayAddress 
      }
    }
  } = invoice;

  const webhookBody = await readBody(event);
    // {
  //   "block_height": -1,
  //   "block_index": -1,
  //   "hash": "782f95de108a70ccda3b5c10d2952ee3ee3ed7acc46fcab3c9c95b682d3c0a2c",
  //   "addresses": [
  //     "383oRq7UKSJCA5u8J8jsJhXJpztD765nsR",
  //     "3Eg2WrAvtXwDLToTYsNTFBofNG6tj2f2S8",
  //     "3P66vqt8j2yRL9KZKkJ9SyqqyTZ6QxFbVq"
  //   ],
  //   "total": 373074816,
  //   "fees": 4029,
  //   "size": 247,
  //   "vsize": 166,
  //   "preference": "low",
  //   "relayed_by": "18.212.89.245:8333",
  //   "received": "2023-09-17T02:59:41.267Z",
  //   "ver": 2,
  //   "lock_time": 808063,
  //   "double_spend": false,
  //   "vin_sz": 1,
  //   "vout_sz": 2,
  //   "opt_in_rbf": true,
  //   "confirmations": 0,
  //   "inputs": [
  //     {
  //       "prev_hash": "d9ab0f3e24e0fff132ad478588ca97473f53bf9098e86ab6801ef53d1dc5efaf",
  //       "output_index": 0,
  //       "script": "160014c3d0c3b17d5ed7029d5b353eeeb6b2d226f582ba",
  //       "output_value": 373078845,
  //       "sequence": 4294967293,
  //       "addresses": [
  //         "3Eg2WrAvtXwDLToTYsNTFBofNG6tj2f2S8"
  //       ],
  //       "script_type": "pay-to-script-hash",
  //       "age": 808063
  //     }
  //   ],
  //   "outputs": [
  //     {
  //       "value": 373073815,
  //       "script": "a914eab862fdd7c9fa1a9f2c3fabafbb9024bef2602587",
  //       "addresses": [
  //         "3P66vqt8j2yRL9KZKkJ9SyqqyTZ6QxFbVq"
  //       ],
  //       "script_type": "pay-to-script-hash"
  //     },
  //     {
  //       "value": 1001,
  //       "script": "a91445bf0f3eae38745b8da47e0a456b276974f698d087", // This is the invoice address
  //       "addresses": [
  //         "383oRq7UKSJCA5u8J8jsJhXJpztD765nsR"
  //       ],
  //       "script_type": "pay-to-script-hash"
  //     }
  //   ]
  // }  
  const { outputs } = webhookBody;
  const output = find(outputs, o => o.addresses.includes(gatewayAddress));
  if (!output) {
    setResponseStatus(event, 500);
    return;
  }
  const { value: webHookValue } = output;

  const mempool = await ofetch(`https://mempool.space/api/address/${webHookAddress}/txs`);
//   [
//     {
//         "txid": "782f95de108a70ccda3b5c10d2952ee3ee3ed7acc46fcab3c9c95b682d3c0a2c",
//         "version": 2,
//         "locktime": 808063,
//         "vin": [
//             {
//                 "txid": "d9ab0f3e24e0fff132ad478588ca97473f53bf9098e86ab6801ef53d1dc5efaf",
//                 "vout": 0,
//                 "prevout": {
//                     "scriptpubkey": "a9148e69b6844208085f8642d5f5608087c30e2bbfcd87",
//                     "scriptpubkey_asm": "OP_HASH160 OP_PUSHBYTES_20 8e69b6844208085f8642d5f5608087c30e2bbfcd OP_EQUAL",
//                     "scriptpubkey_type": "p2sh",
//                     "scriptpubkey_address": "3Eg2WrAvtXwDLToTYsNTFBofNG6tj2f2S8",
//                     "value": 373078845
//                 },
//                 "scriptsig": "160014c3d0c3b17d5ed7029d5b353eeeb6b2d226f582ba",
//                 "scriptsig_asm": "OP_PUSHBYTES_22 0014c3d0c3b17d5ed7029d5b353eeeb6b2d226f582ba",
//                 "witness": [
//                     "3044022003fd3555b2e84d5160b072d4394f60c3656a8d6ef01ba50419782098ee33088c02204ebf5a6b1afcef223482bcc82f0269dfa83e501465e6d0837446a033a4d6acd901",
//                     "02cfb213b55aaf0d3628764113418793027b07982e71d3687aa79463101a6a721d"
//                 ],
//                 "is_coinbase": false,
//                 "sequence": 4294967293,
//                 "inner_redeemscript_asm": "OP_0 OP_PUSHBYTES_20 c3d0c3b17d5ed7029d5b353eeeb6b2d226f582ba"
//             }
//         ],
//         "vout": [
//             {
//                 "scriptpubkey": "a914eab862fdd7c9fa1a9f2c3fabafbb9024bef2602587",
//                 "scriptpubkey_asm": "OP_HASH160 OP_PUSHBYTES_20 eab862fdd7c9fa1a9f2c3fabafbb9024bef26025 OP_EQUAL",
//                 "scriptpubkey_type": "p2sh",
//                 "scriptpubkey_address": "3P66vqt8j2yRL9KZKkJ9SyqqyTZ6QxFbVq",
//                 "value": 373073815
//             },
//             {
//                 "scriptpubkey": "a91445bf0f3eae38745b8da47e0a456b276974f698d087",
//                 "scriptpubkey_asm": "OP_HASH160 OP_PUSHBYTES_20 45bf0f3eae38745b8da47e0a456b276974f698d0 OP_EQUAL",
//                 "scriptpubkey_type": "p2sh",
//                 "scriptpubkey_address": "383oRq7UKSJCA5u8J8jsJhXJpztD765nsR",
//                 "value": 1001
//             }
//         ],
//         "size": 247,
//         "weight": 661,
//         "fee": 4029,
//         "status": {vout
//             "confirmed": true,
//             "block_height": 808065,
//             "block_hash": "00000000000000000002b33f36745795709c9884ec4ebf6e69da28b6b497cd61",
//             "block_time": 1694920710
//         }
//     }
// ]
  const [{ vout }] = mempool;
  if (!vout) {
    setResponseStatus(event, 500);
    return;
  }
  const out = find(vout, { scriptpubkey_address:  gatewayAddress});
  if (!out) {
    setResponseStatus(event, 500);
    return;
  }
  const { value: mempoolValue } = mempool;
  if (webHookValue !== mempoolValue) {
    setResponseStatus(event, 500);
    return;
  }

  const { transporter } = getNodemailer();

  const {
    emails: {
      fiatReleased: {
        subject,
        content
      }
    }
  } = await useStorage(`lang`).getItem(`${buyerLanguage}`);

  const {
    public: {
      deploymentDomain
    }
  } = useRuntimeConfig();

  await transporter.sendMail({
    to: buyerEmail,
    subject: subject,
    text: content.repalce('{url}', `${deploymentDomain}/${buyerLanguage}/${profile}/${buyerService}`),
  });

  await pusherTrigger('bitcoin_released_webhook', invoiceId, {
    address: gatewayAddress,
    value: mempoolValue
  });

  return;
});