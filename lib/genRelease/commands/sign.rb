require 'digest/md5'
require 'digest/sha1'

module GenRelease
  module Commands
    class Sign
      FILENAME = "Release.rsa"
      def initialize options
        @options = options
        @current_dir = Dir.getwd
      end

      def sign
        @rsa = ::OpenSSL::PKey::RSA.new File.read "#{@current_dir}#{File::SEPARATOR}rsa.pem"
        content = File.open("#{@current_dir}#{File::SEPARATOR}Release",'rb') {|file| file.read}
        message = @rsa.private_encrypt(content.gsub("\n",""))
        ::GenRelease::FileUtils::write "#{@current_dir}#{File::SEPARATOR}#{FILENAME}",message
      end
    end
  end
end
