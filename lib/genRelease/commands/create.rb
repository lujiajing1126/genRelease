module GenRelease
  module Commands
    class Create
      def initialize global_options
        @global_options = global_options
        @current_dir = Dir.getwd
      end

      def create
        OpenSSLUtils::new_certification_file
      end
    end
  end
end
