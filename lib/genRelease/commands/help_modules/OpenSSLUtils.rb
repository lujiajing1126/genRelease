module GenRelease
  module OpenSSLUtils
    extend self
    PUBKEY = "id_rsa.pub"
    PRIKEY = "id_rsa"
    PEM = "rsa.pem"

    def new_certification_file
      rsa = ::OpenSSL::PKey::RSA.new 2048
      p rsa.to_pem
      FileUtils::write PRIKEY, rsa.to_pem
      p rsa.public_key.to_s
      FileUtils::write PUBKEY, rsa.public_key.to_s
      FileUtils::write PEM, "#{rsa.public_key}#{rsa.to_pem}"
    end
  end
end
