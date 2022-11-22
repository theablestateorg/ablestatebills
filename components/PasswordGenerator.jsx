import { AiOutlineCopy } from 'react-icons/ai'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PasswordGenerator({ password, setPassword, resize=false}) {
    const handleGeneratePassword = () => {
        setPassword(createPassword())
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
    <div className={`${resize && "flex flex-col md:flex-row md:items-center md:gap-10 my-5"}`}>
        <label htmlFor="" className={`${resize && "text-md md:text-xl mb-1 w-4/12 md:w-2/12"}`}>Password</label>
      <div className={`my-2 flex gap-2 justify-between ${resize && "w-12/12 md:w-8/12"}`}>
      <div className='outline outline-1 outline-black w-full bg-blue-50 flex justify-between items-center px-5 py-1 rounded-sm'>
          <h3 className='password-h3'>{password}</h3>
          <button type='button' className='py-2' onClick={handleCopyPassword}>
          <AiOutlineCopy />
          </button>
      </div>
      <button type='button' className='bg-[#CA3011] hover:bg-[#d33314] text-white py-1 px-5 rounded-sm outline outline-1 outline-[#CA3011]' onClick={handleGeneratePassword}>Generate</button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
