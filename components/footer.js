const Footer = () => {
  return (
    <footer className="py-4 text-center w-full">
      <p className="text-gray-300 text-sm">
        © 2025 Developed by{' '}
        <a 
          href="https://www.yazanmuqbel.com" 
          className="underline text-blue-600 hover:text-blue-800"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Yazan Muqbel
        </a>{' '}
        using{' '}
        <a 
          href="https://aladhan.com/" 
          className="underline text-blue-600 hover:text-blue-800"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Aladhan.com
        </a>{' '}
        API
      </p>
    </footer>
  );
}

export default Footer;
