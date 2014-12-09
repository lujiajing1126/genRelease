module GenRelease
  module FileUtils
    extend self
    def write(file,content)
      tmpfile = touch file
      tmpfile.flock File::LOCK_EX
      tmpfile.print content
      tmpfile.flock File::LOCK_UN
      tmpfile.close
    end

    def touch file
      File.open(file,'w')
    end

    def format(content)
      result = ""
      content.each do |k,v|
        result << ::Kernel::sprintf("%s\nmd5:%s\nsha1:%s\n\n",k.to_s,v[:md5],v[:sha1])
      end
      result
    end
  end
end