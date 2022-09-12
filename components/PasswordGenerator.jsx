import { AiOutlineCopy } from 'react-icons/ai'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PasswordGenerator({ password, setPassword}) {
  console.log(password)
    const handleGeneratePassword = () => {
        setPassword(createPassword())
        // console.log(fields)
      }
    const createPassword = () => {
        const characterList = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!^+%&=?#$*@"
  
        let password = '';
        const characterListLength = characterList.length;
        for (let i = 0; i < 12; i++) {
          const characterIndex = Math.round(Math.random() * characterListLength);
          password = password + characterList.charAt(characterIndex);
        }
        return password;
      }


      // copy password to click board
      const copyToClipboard = () => {
        const newTextArea = document.createElement('textarea');
        newTextArea.innerText = password;
        document.body.appendChild(newTextArea);
        newTextArea.select();
        document.execCommand('copy');
        newTextArea.remove();
      }

      const handleCopyPassword = (e) => {
        if (password === '') {
          toast.error('Nothing To Copy', {position: "top-center"});
        } else {
          copyToClipboard();
          toast.success('Password successfully copied to clipboard', {position: "top-center"});
        }
      }


  return (
    <div>
        <label htmlFor="">Password</label>
      <div className="my-2 flex gap-2 justify-between">
      <div className='outline outline-1 outline-black w-full bg-blue-50 flex justify-between items-center px-5 py-2'>
          <h3 className='password-h3'>{password}</h3>
          <button type='button' className='py-2' onClick={handleCopyPassword}>
          <AiOutlineCopy />
          </button>
      </div>
      <button type='button' className='bg-[#CA3011] text-white py-1 px-5' onClick={handleGeneratePassword}>Generate</button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
