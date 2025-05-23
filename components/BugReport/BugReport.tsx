import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@nextui-org/tooltip';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Input,
  Textarea,
} from '@nextui-org/react';
import { BugTypes } from '@/types/data';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FileUpload from './FileUpload';
import { useState } from 'react';
import { showFailedToast, showSuccessToast } from '../toast/CustomToast';
import { SendBugReport } from './bug-server-action/ReportHandler';
import { UserAuth } from '@/config/AuthContext';

const FormSchema = z.object({
  bugType: z.string().nonempty({ message: 'Bug Type is required' }),
  bugName: z.string().nonempty({ message: 'Bug Name is required' }),
  Description: z.string().nonempty({ message: 'Bug Details are required' }),
  bugImage: z.string().optional(),
});

const BugReportButton = () => {
  const { user, currentuser } = UserAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bugType: '',
      bugName: '',
      Description: '',
      bugImage: '',
    },
  });

  async function onSubmit(data: any) {
    data.userId = user.uid;
    data.bugImage = selectedFile;
    data.submitId = currentuser.userId;

    try {
      const result = await SendBugReport(data);
      const { status } = JSON.parse(result) as { status: number };
      if (status === 429) {
        showFailedToast('Please wait before submitting another bug report');
        return;
      }
      if (status !== 200) {
        showFailedToast('Bug Report Failed to Send');
      } else {
        showSuccessToast('Bug Reported Successfully');
      }
    } catch (error) {
      console.error('Error submitting bug report:', error);
      showFailedToast('An error occurred. Please try again later.');
    } finally {
      setSelectedFile(null); // Reset selected file
      onClose();
      handleClose();
    }
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleClose = () => {
    reset({
      bugType: '',
      bugName: '',
      Description: '',
      bugImage: '',
    });
    setSelectedFile(null);
    onClose();
  };

  return (
    <>
      <Tooltip
        content={
          <div className="px-2 py-1 ">
            <div className="text-sm font-bold text-black">Bug Report</div>
            <div className="text-xs text-zinc-800">Report any bugs you encounter</div>
          </div>
        }
      >
        <button
          onClick={onOpen}
          className="text-lg text-red-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={faBug} />
        </button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleClose();
        }}
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="text-lg font-bold text-zinc-800">Bug Report</ModalHeader>
          <ModalBody>
            <Select
              {...register('bugType')}
              label="Bug Type"
              placeholder="Select a bug type"
              className={'max-w-md mb-4'}
              color={errors.bugType ? 'danger' : 'default'}
            >
              {BugTypes.map((type) => (
                <SelectItem key={type.key} className='text-black'>{type.label}</SelectItem>
              ))}
            </Select>

            <Input
              {...register('bugName')}
              type="text"
              label="Bug Title"
              placeholder="Enter Bug Title"
              className={'max-w-md mb-'}
              color={errors.bugName ? 'danger' : 'default'}
            />

            <Textarea
              {...register('Description')}
              label="Description"
              placeholder="Enter bug description"
              className={'max-w-md mb-4'}
              color={errors.Description ? 'danger' : 'default'}
            />

            <FileUpload
              onFileSelect={handleFileSelect}
              onReset={() => setSelectedFile(null)}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} className="mr-2">
              Close
            </Button>
            <Button color="primary" onClick={handleSubmit(onSubmit)}>
              Send Bug Report
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BugReportButton;
