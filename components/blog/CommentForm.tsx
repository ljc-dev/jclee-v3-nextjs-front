import { useCallback, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ADD_COMMENT_TO_POST } from '../../myConfig/recapConfig';
import { commentSubmittedToastId } from '../../myConfig/toastConfig';

const handleCommentSubmitted = () => {
  toast.success("Comment Submitted!", {
    autoClose: 1500,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT,
    toastId: commentSubmittedToastId,
  });
}

interface Props {
  className?: string,
  _id: string,
}

type Inputs = {
  name: string,
  email: string,
  text: string,
}

const CommentForm = ({ className, _id, }: Props) => {
  const { register, handleSubmit, formState: { errors }, reset, } = useForm<Inputs>();
  const { executeRecaptcha } = useGoogleReCaptcha()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    reset({ name: "", email: "", text: "", })
    // console.log(data)
    //toast saying comment submitted even if it failed
    handleCommentSubmitted()
    if (!executeRecaptcha) {
      console.log("recaptcha sucks!");
      return
    }
    const recaptchaToken = await executeRecaptcha(ADD_COMMENT_TO_POST)
    const createCommentRes = await fetch("/api/create-comment", {
      method: "POST",
      body: JSON.stringify({ ...data, _id, recaptchaToken, }),
      // body: JSON.stringify({ ...data, _id, }),
    })
    const resData = await createCommentRes.json()
    // console.log("comment details", resData);
  }

  return (
    <form className={`${className} flex flex-col items-start`} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="commentNameId" className="text-sm">Name *</label>
      <input id="commentNameId" className="rounded-sm py-1 px-2 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-700" {...register('name', { required: true })} />
      <label htmlFor="commentEmailId" className="mt-4 text-sm">Email *</label>
      <input type="email" id="commentEmailId" className="rounded-sm py-1 px-2 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-700" {...register('email', { required: true })} />
      <label htmlFor="commentTextId" className="mt-4 text-sm">Comment</label>
      <textarea id="commentTextId" className="w-full min-h-[10rem] rounded-sm py-1 px-2 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-700" {...register('text', { required: true })} />
      <p className="text-xs text-gray-500 tracking-tight">
        This site is protected by reCAPTCHA and the Google
        <a rel="noopener noreferrer" className="underline ml-1" target="_blank" href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a rel="noopener noreferrer" className="underline ml-1" target="_blank" href="https://policies.google.com/terms">Terms of Service</a> apply.
      </p>
      <button className="text-sm focus:outline-none mt-8 bg-blue-800 bg-opacity-90 hover:bg-opacity-80 focus:bg-opacity-80 transition duration-100 text-white rounded-sm py-2 px-8 font-semibold capitalize">
        submit comment
      </button>
    </form>
  )
}

export default CommentForm