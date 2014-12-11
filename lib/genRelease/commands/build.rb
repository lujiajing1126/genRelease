require 'digest/md5'
require 'digest/sha1'
module GenRelease
  module Commands
    class Build
      FILTERS = %w{'.','..','.DS_Store'}
      FILENAME = 'Packages'
      RELEASE = 'Release'
      CHECKSUM = %w{'md5','sha1'}
      def initialize(global_options,*directory_lists)
        @global_options = global_options
        @directories = directory_lists
        @current_dir = Dir.getwd
        @checksum = {}
      end
      def build (options)
        @hostname = options[:hostname]
        @directories.each do |directory|
          enum_path "#{@current_dir}#{File::SEPARATOR}#{directory}"
        end
        write_to_modules
        sign
      end

      private
      def enum_path full_directory
        Dir.foreach(full_directory).reject{|filename| FILTERS.include? filename or filename.start_with? '.'}.each do |file|
          full_file_name = "#{full_directory}#{File::SEPARATOR}#{file}"
          if File.directory? full_file_name
            enum_path full_file_name
          elsif File.file? full_file_name
            write_md5 full_file_name
          end
        end
      end

      def write_md5(file_path)
        file_name = "#{file_path.gsub(@current_dir,@hostname)}"
        file = File.open(file_path,'rb'){|fs| fs.read}
        @checksum[file_name] = {}
        @checksum[file_name][:md5] = Digest::MD5.hexdigest(file)
        @checksum[file_name][:sha1] = Digest::SHA1.hexdigest(file)
        p "#{file_name} md5:#{@checksum[file_name][:md5]} sha1:#{@checksum[file_name][:sha1]}" if @global_options[:verbose]
      end

      def write_to_modules
        FileUtils::write(FILENAME,FileUtils::format(@checksum))
      end
      def sign
        content = File.open("#{@current_dir}#{File::SEPARATOR}Packages") { |file| file.read }
        md5 = Digest::MD5.hexdigest(content.gsub("\n",""))
        sha1 = Digest::SHA1.hexdigest(content.gsub("\n",""))
        checksum = {}
        checksum[@hostname] = {
            :md5 => md5,
            :sha1 => sha1
        }
        FileUtils::write(RELEASE,FileUtils::format(checksum))
      end
    end
  end
end
