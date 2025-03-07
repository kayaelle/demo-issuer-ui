'use client';

import { CredentialTypes, ExpirationChoices } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  LinkIcon,
  LinkSlashIcon,
  ClockIcon,
  AcademicCapIcon,
  UserCircleIcon,
  WalletIcon,
  DocumentTextIcon,
  InboxArrowDownIcon
} from '@heroicons/react/24/outline';

import { Button } from '@/app/ui/button';
import { issueCredential, State } from '@/app/lib/actions';
import { useActionState } from 'react';

import {CopyToClipboard} from 'react-copy-to-clipboard';

const expiryOptions : ExpirationChoices[] = [
  {id: 1, name: 'In One Minute'},
  {id: 2, name: 'In Thirty Minutes'},
  {id: 3, name: 'In One Day'}, 
  {id: 4, name: 'In One Week'},
  {id: 5, name: 'In One Month'},
  {id: 6, name: 'In One Year'}
]

const credentialTypes : CredentialTypes[] = [
  {id: "bachelor", name: "Bachelor's Degree"}, 
  {id: "course", name: "Course Credential"}
]

export default function Form() {
  const initialState: State = { message: null, errors: {}, signedVC: null, deepLink: null, data: {recipientName: 'jc', email: 'chartraj@mit.edu', credentialType: "1", expiry: "3", delivery: 'lcw'} };
  const [state, formAction] = useActionState(issueCredential, initialState);

  return (
    <div>
    <form action={formAction} id="blah">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Credential Type */}
        <div className="mb-4">
          <label htmlFor="credentialType" className="mb-2 block text-sm font-medium">
            Choose credential type
          </label>
          <div className="relative">
            <select
              id="credentialType"
              name="credentialType"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.data.credentialType}
              aria-describedby="credentialType-error"
            >
              <option value="" disabled>
                Select a credential type
              </option>
              {credentialTypes.map((credentialType) => (
                <option key={credentialType.id} value={credentialType.id}>
                  {credentialType.name}
                </option> 
              ))}
            </select>
            <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="credentialType-error" aria-live="polite" aria-atomic="true">
            {state.errors?.credentialType &&
              state.errors.credentialType.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

{/* Expiry */}
<div className="mb-4">
          <label htmlFor="expiry" className="mb-2 block text-sm font-medium">
            When should the credential expire?
          </label>
          <div className="relative">
            <select
              id="expiry"
              name="expiry"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.data.expiry}
              aria-describedby="expiry-error"
            >
              <option value="" disabled>
                Expires in
              </option>
              {expiryOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option> 
              ))}
            </select>
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="expiry-error" aria-live="polite" aria-atomic="true">
            {state.errors?.expiry &&
              state.errors.expiry.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

  {/* Name to put on the credential */}
        <div className="mb-4">
          <label htmlFor="recipientName" className="mb-2 block text-sm font-medium">
            Recipient Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="recipientName"
                name="recipientName"
                type="string"
                defaultValue={state.data.recipientName}
                placeholder="Enter the name of credential recipient"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="recipientName-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="recipientName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.recipientName &&
              state.errors.recipientName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>


  {/* Email address to which to send the credential */}
  <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={state.data.email}
                placeholder="Email address to send credential to"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
              <InboxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* LCW vs direct */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            How would you like to receive the signed credential?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="lcw"
                  name="delivery"
                  type="radio"
                  value="lcw" 
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                  defaultChecked = {state.data.delivery === "lcw"}
                />
                <label
                  htmlFor="delivery"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-white-600"
                >
                  Issue to the Learner Credential Wallet. <WalletIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="direct"
                  name="delivery"
                  type="radio"
                  value="direct"
                  defaultChecked = {state.data.delivery === "direct"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="direct"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-white-600"
                >
                  Display it here in the lab <DocumentTextIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="lcw-error" aria-live="polite" aria-atomic="true">
            {state.errors?.delivery &&
              state.errors.delivery.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

  

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/lcw/create"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Clear
        </Link>
        <Button type="submit">Award Credential</Button>
      </div>
    </form>
    { state.signedVC &&
    <div>
        <CopyToClipboard text={JSON.stringify(state.signedVC,null,2)}>
          <Button>Copy VC to clipboard</Button>
        </CopyToClipboard>
       
            <pre>{state.signedVC?JSON.stringify(state.signedVC,null,2):''}</pre>
    </div>
    }

{ state.deepLink &&
    <div>
       <br/> <br/>
      Lovely - your credential has been awarded! <br/> <br/> You should momentarily receive an email with a link to collect the credential.
<br/>
You can also go directly to the same claim page if you like:

      <div className="mt-6 flex justify-start gap-4">
      <Link href={`${state.deepLink.collectionPageURL}`} className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">Go to Claim Page</Link><br/><br/>
      </div>

    <br/> <br/>

    Or if you like, and you are on your phone already you can directly add the credential to your wallet:
    <br/><br/>


   <div className="mt-6 flex justify-start gap-4">
      <Link href={`${state.deepLink.directDeepLink}`} className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">Add to Learner Credential Wallet</Link><br/><br/>
      </div>


    </div>
}
    </div>
  );
}
