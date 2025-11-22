"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import inter from '@/lib/font/Inter'
import { ArrowLeft, Search, ChevronRight, Plus, X } from 'lucide-react'
import Link from 'next/link'
import Nav from '@/components/layout/nav'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface Partner {
  id: string;
  name: string;
  role: string;
  image?: string;
}

function PartnerCard({ 
  partner, 
  isSuspicious,
  onSuspectClick,
  onRemoveClick 
}: { 
  partner: Partner; 
  isSuspicious?: boolean;
  onSuspectClick?: (partner: Partner) => void;
  onRemoveClick?: (partner: Partner) => void;
}) {
  return (
    <div className="w-full mt-2">
      <div className="h-20 w-full bg-white rounded-lg shadow-sm flex items-center px-4 gap-4">
        <img
          src={partner.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{partner.name}</h3>
          <p className="text-sm text-gray-500 truncate">{partner.role}</p>
        </div>
        {isSuspicious ? (
          <button 
            onClick={() => onRemoveClick?.(partner)}
            className="px-4 py-1.5 flex items-center justify-center text-xs gap-1 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 transition-colors flex-shrink-0"
          >
            Remove<X size={12}/>
          </button>
        ) : (
          <button 
            onClick={() => onSuspectClick?.(partner)}
            className="px-4 py-1.5 flex items-center justify-center gap-1 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors flex-shrink-0"
          >
            Suspect<Plus size={12}/>
          </button>
        )}
      </div>
    </div>
  )
}

function PartnerCardSkeleton() {
  return (
    <div className="w-full mt-2">
      <div className="h-20 w-full bg-white rounded-lg shadow-sm flex items-center px-4 gap-4">
        <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
    </div>
  )
}

function Page() {
  const [activeTab, setActiveTab] = useState<'partners' | 'suspicious'>('partners')
  const [partners, setPartners] = useState<Partner[]>([])
  const [suspiciousPartners, setSuspiciousPartners] = useState<Partner[]>([])
  const [loadingPartners, setLoadingPartners] = useState(false)
  const [loadingSuspicious, setLoadingSuspicious] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Suspect Dialog state
  const [suspectDialogOpen, setSuspectDialogOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Remove Dialog state
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [partnerToRemove, setPartnerToRemove] = useState<Partner | null>(null)
  const [isRemoving, setIsRemoving] = useState(false)

  // Fetch Partner List
  useEffect(() => {
    const fetchPartners = async () => {
      setLoadingPartners(true)
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/getAllpartner`)
        console.log(response)
        setPartners(response.data.partners ?? response.data ?? [])
   
      } catch (err) {
        console.error('Failed to fetch partners', err)
        setPartners([])
      } finally {
        setLoadingPartners(false)
      }
    }
    fetchPartners()
  }, [])

  // Fetch Suspicious Partners
  useEffect(() => {
    const fetchSuspiciousPartners = async () => {
      setLoadingSuspicious(true)
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/suspicious`)
      
        setSuspiciousPartners(response.data.partners ?? response.data ?? [])

      } catch (err) {
        console.error('Failed to fetch suspicious partners', err)
        setSuspiciousPartners([])
      } finally {
        setLoadingSuspicious(false)
      }
    }
    fetchSuspiciousPartners()
  }, [])

  // Handle opening the suspect confirmation dialog
  const handleSuspectClick = (partner: Partner) => {
    setSelectedPartner(partner)
    setSuspectDialogOpen(true)
  }

  // Handle opening the remove confirmation dialog
  const handleRemoveClick = (partner: Partner) => {
    setPartnerToRemove(partner)
    setRemoveDialogOpen(true)
  }

  // Handle confirming the suspect action
  const handleSuspect = async () => {
    if (!selectedPartner) return

    setIsSubmitting(true)
    console.log(selectedPartner.id)
    try {
      const response = await axios.post(`${BASE_URL}/api/admin/markSuspicious`, {
        partnerId: selectedPartner.id
      })
      console.log('Partner marked as suspicious:', response.data)
      
      // Remove from partners list and add to suspicious list
      setPartners(prev => prev.filter(p => p.id !== selectedPartner.id))
      setSuspiciousPartners(prev => [...prev, selectedPartner])
      
      // Close dialog
      setSuspectDialogOpen(false)
      setSelectedPartner(null)
      
    } catch (err) {
      console.error('Failed to mark partner as suspicious', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle confirming the remove action
  const handleRemove = async () => {
    if (!partnerToRemove) return

    setIsRemoving(true)
    console.log(partnerToRemove.id)
    try {
      const response = await axios.post(`${BASE_URL}/api/admin/removeSuspicious`, {
        partnerId: partnerToRemove.id
      })
      console.log('Partner removed from suspicious:', response.data)
      
      // Remove from suspicious list and add back to partners list
      setSuspiciousPartners(prev => prev.filter(p => p.id !== partnerToRemove.id))
      setPartners(prev => [...prev, partnerToRemove])
      
      // Close dialog
      setRemoveDialogOpen(false)
      setPartnerToRemove(null)
      
    } catch (err) {
      console.error('Failed to remove partner from suspicious', err)
    } finally {
      setIsRemoving(false)
    }
  }

  // Filter based on search
  const filteredPartners = partners.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredSuspicious = suspiciousPartners.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <Nav />
      <div className={`${inter.className} min-h-screen w-full overflow-hidden bg-[#CDE4F9] py-17 px-4 flex items-center justify-start flex-col`}>
        <div className="flex items-center justify-center gap-1 md:gap-3">
          <Link href={"/dashboard/admin"}>
            <Button variant="outline" className="mb-2 rounded-full"><ArrowLeft /></Button>
          </Link>

          <div className="flex items-center bg-white rounded-full shadow px-3 w-11/12 max-w-md mb-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by partner name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-67 md:w-75 px-3 py-2 text-sm outline-none bg-transparent"
            />
          </div>
        </div>

        <div className="py-2 px-5 md:-ml-20 flex-col flex items-start w-96">
          <h1 className={`${inter.className} font-bold text-gray-600 text-2xl flex items-center justify-center mb-2`}>
            {activeTab === 'partners' ? 'Partner List' : 'Suspicious Partner'}
            <ChevronRight />
          </h1>

          {/* Tab Buttons */}
          <div className='h-10 w-full flex items-center justify-center gap-1'>
            <Button
              variant={activeTab === 'suspicious' ? "select" : "selectdashed"}
              className={activeTab === 'suspicious' ? 'bg-white w-1/2' : 'w-1/2'}
              onClick={() => setActiveTab('partners')}
            >
              Partner List
            </Button>
            <Button
              variant={activeTab == 'partners' ? "select" : "selectdashed"}
              className={activeTab === 'partners' ? 'bg-white w-1/2' : 'w-1/2'}
              onClick={() => setActiveTab('suspicious')}
            >
              Suspicious Partner
            </Button>
          </div>

          {/* Partner List Section */}
          {activeTab === 'partners' && (
            <div className='w-full mt-2'>
              {loadingPartners ? (
                <>
                  <PartnerCardSkeleton />
                  <PartnerCardSkeleton />
                  <PartnerCardSkeleton />
                </>
              ) : filteredPartners.length > 0 ? (
                filteredPartners.map((partner) => (
                  <PartnerCard 
                    key={partner.id} 
                    partner={partner} 
                    onSuspectClick={handleSuspectClick}
                  />
                ))
              ) : (
                <div className="w-full mt-4 text-center text-gray-500">
                  No partners found
                </div>
              )}
            </div>
          )}

          {/* Suspicious Partner Section */}
          {activeTab === 'suspicious' && (
            <div className='w-full mt-2'>
              {loadingSuspicious ? (
                <>
                  <PartnerCardSkeleton />
                  <PartnerCardSkeleton />
                  <PartnerCardSkeleton />
                </>
              ) : filteredSuspicious.length > 0 ? (
                filteredSuspicious.map((partner) => (
                  <PartnerCard 
                    key={partner.id} 
                    partner={partner} 
                    isSuspicious 
                    onRemoveClick={handleRemoveClick}
                  />
                ))
              ) : (
                <div className="w-full mt-4 text-center text-gray-500">
                  No suspicious partners found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mark as Suspicious Confirmation Dialog */}
      <AlertDialog open={suspectDialogOpen} onOpenChange={setSuspectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Suspicious?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark <span className="font-semibold">{selectedPartner?.name}</span> as a suspicious partner? This action can be reviewed later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSuspect}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isSubmitting ? 'Processing...' : 'Yes, Mark as Suspicious'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove from Suspicious Confirmation Dialog */}
      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from Suspicious List?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <span className="font-semibold">{partnerToRemove?.name}</span> from the suspicious list? They will be moved back to the regular partner list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRemove}
              disabled={isRemoving}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isRemoving ? 'Processing...' : 'Yes, Remove from Suspicious'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Page